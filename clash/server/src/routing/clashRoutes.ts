import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { clashSchema } from "../validations/clashValidation.js";
import {
  formatError,
  imageValidator,
  removeImage,
  uploadImage,
} from "../helper.js";
import logger from "../config/logger.js";
import { upload } from "../middleware/multerMiddleware.js";
import prisma from "../config/database.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import { uploadToCloudinary } from "../config/cloudinary.js";
const router = Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const clashs = await prisma.clash.findMany({
      where: { user_id: req.user?.id },
    });
    return res.json({ message: "Data Fetched", data: clashs });
  } catch (error) {
    logger.error({ type: "Clash Post Error", body: error });
    res
      .status(500)
      .json({ error: "Something went wrong.please try again!", data: error });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clash = await prisma.clash.findUnique({
      where: { id: Number(id) },
      include: {
        ClashItem: {
          select: {
            image: true,
            id: true,
            count: true,
          },
        },
        ClashComments: {
          select: {
            id: true,
            comment: true,
            created_at: true,
          },
          orderBy: {
            id: "desc",
          },
        },
      },
    });
    return res.json({ message: "Data Fetched", data: clash });
  } catch (error) {
    logger.error({ type: "Clash get Error", body: error });
    res
      .status(500)
      .json({ error: "Something went wrong.please try again!", data: error });
  }
});

router.put("/:id", authMiddleware, upload.single("image"), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const payload = clashSchema.parse(body);
    if ((req as any).file) {
      // * Delete Old Image (Cloudinary or local)
      const clash = await prisma.clash.findUnique({
        select: { id: true, image: true },
        where: { id: Number(id) },
      });
      if (clash?.image && clash.image.startsWith("http")) {
      
          try {
            const publicId = clash.image.split("/").slice(-1)[0].split(".")[0];
    const { cloudinary } = await import("../config/cloudinary.js");
    await cloudinary.uploader.destroy(publicId);
  } catch (e) { /* ignore */ }
      
      }
      const localPath = (req as any).file.path;
      const cloudUrl = await uploadToCloudinary(localPath);
      payload.image = cloudUrl;
    }
    await prisma.clash.update({
      data: payload,
      where: { id: Number(id) },
    });
    return res.json({ message: "Clash updated successfully!" });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = formatError(error);
      res.status(422).json({ message: "Invalid data", errors });
    } else {
      logger.error({ type: "Clash Post Error", body: error });
      res
        .status(500)
        .json({ error: "Something went wrong.please try again!", data: error });
    }
  }
});

router.post("/", authMiddleware, upload.single("image"), async (req: Request, res: Response) => {
  try {
      const body = req.body;
      const payload = clashSchema.parse(body);

      if (!(req as any).file) {
        return res.status(422).json({ errors: { image: "Image is required" } });
      }

      const localPath = (req as any).file.path;
      const cloudUrl = await uploadToCloudinary(localPath);

      const clash = await prisma.clash.create({
        data: {
          title: payload.title,
          description: payload.description,
          image: cloudUrl,
          user_id: req.user?.id!,
          expire_at: new Date(payload.expire_at),
        },
      });

      return res.json({ message: "Clash created successfully!", clash });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = formatError(error);
      res.status(422).json({ message: "Invalid data", errors });
    } else {
      logger.error({ type: "Clash Post Error", body: error });
      res
        .status(500)
        .json({ error: "Something went wrong.please try again!", data: error });
    }
  }
});

router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clash = await prisma.clash.findUnique({
      select: { image: true, user_id: true },
      where: { id: Number(id) },
    });
    if (clash.user_id !== req.user?.id) {
      return res.status(401).json({ message: "Un Authorized" });
    }
    if (clash.image){
      if (clash.image.startsWith("http")) {
        try {
          const publicId = clash.image.split("/").slice(-1)[0].split(".")[0];
    const { cloudinary } = await import("../config/cloudinary.js");
    await cloudinary.uploader.destroy(publicId);
  } catch (e) { /* ignore */ }
    }
  }
    const clashItems = await prisma.clashItem.findMany({
      select: {
        image: true,
      },
      where: {
        clash_id: Number(id),
      },
    });

    // * Remove Clash items images
    if (clashItems.length > 0) {
      clashItems.forEach(async (item) => {
        if (item.image.startsWith("http")) {
          try {
            const publicId = item.image.split("/").slice(-1)[0].split(".")[0];
    const { cloudinary } = await import("../config/cloudinary.js");
    await cloudinary.uploader.destroy(publicId);
  } catch (e) { /* ignore */ }
      }
    });
    }

    await prisma.clash.delete({
      where: { id: Number(id) },
    });
    return res.json({ message: "Clash Deleted successfully!" });
  } catch (error) {
    logger.error({ type: "Clash Error", error });
    return res.status(500).json({ message: "Something went wrong" });
  }
});

//  To add items
router.post("/items", authMiddleware, upload.array("images[]", 10), async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const files = (req as any).files as Array<{ path: string }>;
    if (!files || files.length < 2) {
      return res
        .status(404)
        .json({ message: "Please select at least 2 images for clashing." });
    }

    const uploadedImages: string[] = [];
    for (const file of files) {
      const cloudUrl = await uploadToCloudinary(file.path);
      uploadedImages.push(cloudUrl);
    }

    const items = await Promise.all(
      uploadedImages.map(async (imgUrl) => {
        return await prisma.clashItem.create({
          data: {
            image: imgUrl,
            clash_id: Number(id),
          },
        });
      })
    );

    return res.json({ message: "Clash Items updated successfully!", items });
  } catch (error) {
    logger.error({ type: "Clash Item", body: JSON.stringify(error) });
    return res
      .status(500)
      .json({ message: "Something went wrong.please try again" });
  }
});

export default router;
