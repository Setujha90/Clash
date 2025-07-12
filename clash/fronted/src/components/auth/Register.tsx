"use client" // This file is a client component, allowing it to use hooks and client-side features,also it helps to manage the form submission and state on the client side and handle validation and submission of the registration form.It also show error messages in the input fields if any validation fails.

import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerAction } from '@/actions/authActions'
import { SubmitButton } from '@/components/common/SubmitBtn'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'


export default function Register() {  // This component renders a registration form with fields for name, email, password, and confirm password.
    // It uses a custom hook `useFormState` to manage the form state and handle
    const initState = {
        status: 0,
        message:"",
        errors: {}
    }
    const [state,formAction] = useFormState(registerAction, initState) // `useFormState` is a custom hook that manages the form state and handles the form submission action.

    useEffect(()=>{ // This effect runs whenever the `state` changes, allowing us to handle side effects based on the form submission result.
        if(state.status === 500){
            toast.error(state.message)
        }else if(state.status === 200){
            toast.success(state.message)
        }
    },[state])

return (
    <form action={formAction}> // The form uses the `formAction` function to handle the submission, which is provided by the `useFormState` hook.
                <div className='mt-4'>
                    <Label htmlFor='name' className='mb-1'>Name</Label>
                    <Input id='name' name='name'type='text' placeholder='Enter your Full Name' />

                    <span className='text-red-500'>{state.errors?.name}</span>
                </div>
                <div className='mt-4'>
                    <Label htmlFor='email' className='mb-1'>Email</Label>
                    <Input id='email' name='email'type='email' placeholder='Enter your email' />
                    <span className='text-red-500'>{state.errors?.email}</span>
                </div>
                <div className='mt-4'>
                    <Label htmlFor='password' className='mb-1'>Password</Label>
                    <Input id='password' name='password' type='password' placeholder='Enter your password' />
                    <span className='text-red-500'>{state.errors?.password}</span>
                </div>
                <div className='mt-4'>
                    <Label htmlFor='confirmpassword' className='mb-1'>Confirm Password</Label>
                    <Input id='confirmpassword' name='confirmpassword' type='password' placeholder='Confirm your password' />
                    <span className='text-red-500'>{state.errors?.confirmpassword}</span>
                </div>

                <div className='mt-4'>
                    <SubmitButton />
                </div>
            </form>
)
}
