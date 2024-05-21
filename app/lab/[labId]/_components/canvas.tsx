"use client";

import React from 'react'
import Info from './info';
import Participants from './participants';
import ToolBar from './toolbar';
import { useSelf } from '@/liveblocks.config';

interface CanvasProps {
  labId: string;
}

const Canvas = ({ labId }: CanvasProps) => {
  const info = useSelf((me) => me.info);
  console.log(info);
  
  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none'>
        <Info />
        <Participants />
        <ToolBar />
    </main>
  )
}

export default Canvas