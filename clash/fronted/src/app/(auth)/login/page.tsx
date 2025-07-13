import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'
import Login from '@/components/auth/Login'
export default function login() {
    return (
    <div className='flex items-center justify-center h-screen'>
        <div className='w-[400px] bg-white rounded-xl px-10 py-2 shadow-lg'>
                <h1 className='text-3xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text text-center '>Clash</h1>
            <h1 className='text-3xl font-bold'>Login</h1>
            <p className='text-1xl '>Welcome Back</p>

                <Login />
            <div className='mt-4 text-center'>
                <p>Don't have an account ? <Link href='/register' className='text-blue-500'>Sign Up</Link></p>
                </div>
        </div>
    </div>
    )
}
