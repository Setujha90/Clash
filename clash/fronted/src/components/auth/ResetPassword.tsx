"use client" 

import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { resetpassAction } from '@/actions/authActions'
import { SubmitButton } from '@/components/common/SubmitBtn'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'
import { useSearchParams,useRouter } from 'next/navigation'



export default function ResetPassword() { 
    const initState = {
        status: 0,
        message:"",
        errors: {}
    }
    const [state,formAction] = useFormState(resetpassAction, initState) 
    const sparam = useSearchParams()
    const router = useRouter()

    useEffect(()=>{ 
        if(state.status === 500){
            toast.error(state.message)
        }else if(state.status === 200){
            toast.success(state.message)
            setTimeout(() => {
                router.replace("/login")
            }, 1000)
        }
    },[state,router])

return (
    <form action={formAction}>
            <input type='hidden' name='token' value={sparam.get('token') ?? " "} />
            
                <div className='mt-4'>
                    <Label htmlFor='email' className='mb-1'>Email</Label>
                    <Input id='email' name='email' type='email' placeholder='Enter your email' readOnly value={sparam.get('email') ?? " "}/> 
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
