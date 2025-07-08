import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className= 'w-full h-screen flex items-center justify-center flex-col'>
        <div>
            <Image src = "/banner_img.svg" width = {600} height = {600} alt = 'banner_img' />
        </div>
        <div className='text-center mt-4'>
          <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text'>Clash</h1>
          <p className='text-2xl md:text-3xl lg:text-3xl font-bold '>Discover the better choice,together</p>
        
          <Link href = '/login'>
                    <Button className='mt-2 '>Start free</Button>

          </Link>
        </div>
        </div>
  )
}
