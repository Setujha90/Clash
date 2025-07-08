import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'

export default function login() {
    return (
    <div className='flex items-center justify-center h-screen'>
        <div className='w-[400px] bg-white rounded-xl px-10 py-2 shadow-lg'>
                <h1 className='text-3xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text text-center font-bold'>Clash</h1>
            <h1 className='text-3xl font-bold'>Login</h1>
            <p className='text-1xl '>Welcome Back</p>

            <form>
                <div className='mt-4'>
                    <Label htmlFor='email' className='mb-1'>Email</Label>
                    <Input id='email' name='email'type='email' placeholder='Enter your email' />
                
                </div>
                <div className='mt-4'>
                    <Label htmlFor='password' className='mb-1' >Password</Label>
                    <Input id='password' name='password' type='password' placeholder='Enter your password' />
                </div>
                <div className='text-right mt-2'>

                <Link href="forget-password">Forget Password ?</Link>
                </div>
                <div className='mt-4'>
                    <Button className='w-full'>Login</Button>
                </div>
            </form>
            <div className='mt-4 text-center'>
                <p>Don't have an account ? <Link href='/register' className='text-blue-500'>Sign Up</Link></p>
                </div>
        </div>
    </div>
    )
}
