"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import axios, { AxiosError } from "axios";
import { CLASH_URL } from "@/lib/apiEndPoints";
import { toast } from "sonner";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { useRouter } from "next/navigation";

export default function AddClash({user}: { user: CustomUser }) {
    const [open, setOpen] = useState(false); // State to manage the dialog open/close,it helps in controlling the visibility of the dialog, initially set to false to keep the dialog hidden.
    const [clashData, setClashData] = useState<ClashFormType>({}); // State to manage the clash data, initialized as an empty object. after writing the form, it will be used to store the title, description, and other details of the clash.
    const [date, setDate] = React.useState<Date | null>();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<File | null>(null); // State to manage the image file, initialized as null. It will be used to store the image file selected by the user for the clash and after form submission, it will be sent to the server as part of the clash data
    const [errors, setErrors] = useState<ClashFormTypeError>({});

    
    const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", clashData?.title ?? "");
            formData.append("description", clashData?.description ?? "");
            formData.append("expire_at", date?.toISOString() ?? "");
            if (image) formData.append("image", image);
            console.log("The user ", user);
            const { data } = await axios.post(CLASH_URL, formData, {
                headers: {
                    Authorization: localStorage.getItem("token") ?? "",
                },
            });
            setLoading(false);
            if (data?.message) {
                setClashData({});
                setDate(null);
                setImage(null);
                toast.success(data?.message);
                setOpen(false);
            }
        } catch (error) {
            console.log("The error is ", error);
            setLoading(false);
            if (error instanceof AxiosError) {
                if (error.response?.status === 422) {
                    setErrors(error.response?.data?.errors);
                }
            } else {
                toast.error("Something went wrong.please try again! " + error);
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Clash</Button>
            </DialogTrigger>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                className="xl:max-h-[95vh] overflow-y-auto"
            >
                <DialogHeader>
                    <DialogTitle>Create Clash</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <Label htmlFor="Title">Title</Label>
                        <Input
                            placeholder="Type clash title"
                            value={clashData?.title ?? ""}
                            onChange={(e) =>
                                setClashData({ ...clashData, title: e.target.value }) // This updates the clashData state with the new title input value keeping clashData as it is and only changing the title property.
                            }
                        />
                        <span className="text-red-500">{errors?.title}</span>
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="Description">Description</Label>
                        <Textarea
                            placeholder="Type clash description"
                            value={clashData?.description ?? ""}
                            onChange={(e) =>
                                setClashData({ ...clashData, description: e.target.value })
                            }
                        />
                        <span className="text-red-500">{errors?.description}</span>
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="name">Image</Label>
                        <Input
                            type="file"
                            onChange={handleImage}
                            placeholder="Type clash name"
                        />
                        <span className="text-red-500">{errors?.image}</span>
                    </div>
                    <div className="mt-4">
                        <Label className="block">Choose Expiry date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full mt-2 justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? date.toDateString() : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date ?? new Date()}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <span className="text-red-500">{errors?.expires_at}</span>
                    </div>
                    <div className="mt-4">
                        <Button className="w-full" disabled={loading}>
                            {loading ? "Processing.." : "Submit"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}