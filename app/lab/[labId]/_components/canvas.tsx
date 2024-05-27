"use client";

import React, { useCallback } from 'react'
import {Info} from './info';
import {Participants} from './participants';
import {ToolBar} from './toolbar';
import { useState } from 'react';
import { Camera, CanvasMode, CanvasState } from '@/types/canvas';
import { useCanRedo, useCanUndo, useHistory, useMutation } from '@/liveblocks.config';
import { CursorsPresence } from './cursors-presence';
import { pointerEventToCanvasPoint } from '@/lib/utils';

interface CanvasProps {
  labId: string;
}

const Canvas = ({ labId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault();
    const current = pointerEventToCanvasPoint(e, camera);

    setMyPresence({ cursor: current });
  }, []);

  const onPointerLeave = useMutation((
    { setMyPresence }
  ) => {
    setMyPresence({ cursor: null });
  }, []);

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
        <svg className='h-[100vh] w-[100vw]' onPointerLeave={onPointerLeave} onWheel={onWheel} onPointerMove={onPointerMove}>
          <g>
            <CursorsPresence />
          </g>
        </svg>
    </main>
  )
}

export default Canvas