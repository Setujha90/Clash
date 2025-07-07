import Image from 'next/image'
import React from 'react'

export default function HeroSection() {
  return (
    <div className= 'w-full h-screen flex items-center justify-center'>
        <div>
            <Image src = "/banner_img.svg" width = {600} height = {600} alt = 'banner_img' />
        </div>
        </div>
  )
}
