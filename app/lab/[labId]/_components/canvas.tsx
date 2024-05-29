"use client";

import React, { useCallback } from 'react'
import {Info} from './info';
import {Participants} from './participants';
import {ToolBar} from './toolbar';
import { useState } from 'react';
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from '@/types/canvas';
import { useCanRedo, useCanUndo, useHistory, useMutation, useOthersMapped, useStorage } from '@/liveblocks.config';
import { CursorsPresence } from './cursors-presence';
import { pointerEventToCanvasPoint } from '@/lib/utils';
import { nanoid } from "nanoid";
import { LiveObject } from '@liveblocks/client';
import { LayerPreview } from './layer-preview';

const MAX_LAYERS = 100;

interface CanvasProps {
  labId: string;
}

const Canvas = ({ labId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds);
  
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [prevColour, setPrevColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation((
    { storage, setMyPresence },
    layerType: LayerType.Circle | LayerType.Rectangle | LayerType.Text | LayerType.Note,
    position: Point,
  ) => {
    const liveLayers = storage.get("layers");
    if (liveLayers.size >= MAX_LAYERS) {
      return;
    } 

    const liveLayerIds = storage.get("layerIds");
    const layerId = nanoid();
    const layer = new LiveObject({
      type: layerType,
      x: position.x,
      y: position.y,
      height: 100,
      width: 100,
      fill: prevColour,
    });

    liveLayerIds.push(layerId);
    liveLayers.set(layerId, layer);

    setMyPresence({ selection: [layerId] }, { addToHistory: true });
    setCanvasState({ mode: CanvasMode.None });
  }, [prevColour]);

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

  const onPointerUp = useMutation((
    {},
    e
  ) => {
    const point = pointerEventToCanvasPoint(e, camera);

    if (canvasState.mode === CanvasMode.Inserting) {
      insertLayer(canvasState.layerType, point);
    } else {
      setCanvasState({
        mode: CanvasMode.None,
      });
    }

    history.resume();
  }, [camera, canvasState, history, insertLayer]);

  const selections = useOthersMapped((other) => other.presence.selection);

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
        <svg className='h-[100vh] w-[100vw]' onPointerUp={onPointerUp} onPointerLeave={onPointerLeave} onWheel={onWheel} onPointerMove={onPointerMove}>
          <g style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`
          }}>
            {layerIds.map((layerId) => (
              <LayerPreview 
                key={layerId}
                id={layerId}
                onLayerPointerDown={() => {}}
                selectionColor="#000"
              />
            ))}
            <CursorsPresence />
          </g>
        </svg>
    </main>
  )
}

export default Canvas