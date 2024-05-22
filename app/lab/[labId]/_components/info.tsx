"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface InfoProps {
  labId: string;
}

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export const Info = ({ labId }: InfoProps) => {
  const data = useQuery(api.lab.get, {
    id: labId as Id<"labs">,
  });

  if(!data) {
    return (
      <InfoSkeleton />
    )
  }


  return (
    <div className='absolute left-2 top-2 bg-white rounded-md px-1.5 flex items-center h-12 shadow-md'>
        <Button variant={"lab"} className="px-2">
          <Image 
            src={'/logo.svg'}
            alt="WhiteLab Logo"
            height={40}
            width={40}
          />
          <span className={cn(
            "font-semibold text-xl ml-2 text-black", font.className
          )}>
            WhiteLab
          </span>
        </Button>
    </div>
  )
}

export const InfoSkeleton = () => {
  return (
    <div className='absolute left-2 top-2 bg-white rounded-md px-1.5 flex items-center h-12 shadow-md w-[300px]' />
  )
}