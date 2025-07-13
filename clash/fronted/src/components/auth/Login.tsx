"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../common/SubmitBtn";
import { useFormState } from "react-dom";
import { loginAction } from "@/actions/authActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import Link from "next/link";

export default function Login() {
    const router = useRouter();
const initialState = {
    message: "",
    status: 0,
    errors: {},
    data: {},
    
};
const [state, formAction] = useFormState(loginAction, initialState);

 useEffect(()=>{ // This effect runs whenever the `state` changes, allowing us to handle side effects based on the form submission result.
        if(state.status === 500){
            toast.error(state.message)
        }else if(state.status === 200){
            toast.success(state.message);
            router.push("/dashboard")
        };
    
    },[state,router])


return (
    <form action={formAction}>
    <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input placeholder="Type your email" name="email" />
        <span className="text-red-400">{state.errors?.email}</span>
    </div>
    <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input
        type="password"
        placeholder="Type your password"
        name="password"
    />
        <div className="text-right font-bold">
        <Link href="/forgot-password">Forgot Password?</Link>
        </div>
        <span className="text-red-400">{state.errors?.password}</span>
    </div>
    <div className="mt-4">
        <SubmitButton />
    </div>
    </form>
);
}