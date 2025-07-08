import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
return (
    <div className="flex flex-col items-center justify-center h-screen">
        <Image src="/404notfound.svg" width={500} height={500} alt='404'/>
    
    <Link href="/">
    <Button>Return Home</Button>
    </Link>
    </div>
)
}