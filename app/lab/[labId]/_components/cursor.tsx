"use client";

import { memo } from "react";
import { connectionIdToColor } from "@/lib/utils";
import { MousePointer2 } from "lucide-react";
import { useOther } from "@/liveblocks.config";

interface CursorProps {
    connectionId: number;
};

export const Cursor = memo(({ connectionId }: CursorProps) => {
    const info = useOther(connectionId, (user) => user?.info);
    const cursor = useOther(connectionId, (user) => user.presence.cursor);
    const name = info?.name || "Guest";

    if(!cursor) {
        return null;
    };

    const { x, y } = cursor;

    return (
        <foreignObject>
            <MousePointer2 className="h-5 w-5" style={{ 
                fill: connectionIdToColor(connectionId), 
                color: connectionIdToColor(connectionId)
            }}/>
        </foreignObject>
    )
});

Cursor.displayName = "Cursor";