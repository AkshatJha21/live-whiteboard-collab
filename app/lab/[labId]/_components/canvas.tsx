"use client";

import React from 'react'
import {Info} from './info';
import {Participants} from './participants';
import {ToolBar} from './toolbar';
import { useState } from 'react';
import { CanvasMode, CanvasState } from '@/types/canvas';
import { useCanRedo, useCanUndo, useHistory } from '@/liveblocks.config';
import { CursorsPresence } from './cursors-presence';

interface CanvasProps {
  labId: string;
}

const Canvas = ({ labId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  return (
    <main className='h-full w-full relative bg-neutral-100 touch-none'>
        <Info labId={labId}/>
        <Participants />
        <ToolBar 
          canvasState={canvasState}
          setCanvasState={setCanvasState}
          canRedo={canRedo}
          canUndo={canUndo}
          undo={history.undo}
          redo={history.redo}
        />
        <svg className='h-[100vh] w-[100vw]'>
          <g>
            <CursorsPresence />
          </g>
        </svg>
    </main>
  )
}

export default Canvas