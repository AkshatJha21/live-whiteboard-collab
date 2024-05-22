"use client"

export const Info = () => {
  return (
    <div className='absolute left-2 top-2 bg-white rounded-md px-1.5 flex items-center h-12 shadow-md'>
        Info about the lab
    </div>
  )
}

export const InfoSkeleton = () => {
  return (
    <div className='absolute left-2 top-2 bg-white rounded-md px-1.5 flex items-center h-12 shadow-md w-[300px]' />
  )
}