import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'
import { registerAction } from '@/actions/authActions'
import { SubmitButton } from '@/components/common/SubmitBtn'

import Register from '@/components/auth/Register'

export default function register() {
    return (
    <div className='flex items-center justify-center h-screen'>
        <div className='w-[400px] bg-white rounded-xl px-10 py-2 shadow-lg'>
                <h1 className='text-3xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text text-center '>Clash</h1>
            <h1 className='text-3xl font-bold'>Register</h1>
            <p className='text-1xl '>Welcome !</p>

            <Register />
            <div className='mt-4 text-center'>
                <p>Already have an account ?<Link href='/login' className='font-bold text-black-500'>Login</Link></p>
                </div>
        </div>
    </div>
    )
}
