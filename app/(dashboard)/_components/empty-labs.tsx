import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const EmptyLabs = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
        <Image 
            src={"/no-lab.svg"}
            alt='Empty Labs'
            height={110}
            width={110}
        />
        <h2 className='text-2xl font-semibold mt-6'>
            No labs found
        </h2>
        <p className='text-muted-foreground text-sm mt-2'>
            Start by creating a new lab.
        </p>
        <div className='mt-6'>
            <Button size={"lg"}>
                Create Lab
            </Button>
        </div>
    </div>
  )
}

export default EmptyLabs