import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function UserAvatar() {
return (
    <Avatar>
    <img
        src="https://avatars.githubusercontent.com/u/12345678?v=4"
        alt="User Avatar"
        style={{ width: "100%", height: "100%", borderRadius: "50%" }}
    />
    <AvatarFallback>CS</AvatarFallback>
    </Avatar>
);
}