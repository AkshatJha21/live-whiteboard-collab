"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Link2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

interface ActionProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
};

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title
}: ActionProps) => {
    const { mutate, pending } = useApiMutation(api.lab.remove);

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/lab/${id}`,
        )
        .then(() => toast.success("Link copied"))
        .catch(() => toast.error("Failed to copy link"));
    }

    const onDelete = () => {
        mutate({ id })
        .then(() => toast.success("Lab deleted"))
        .catch(() => toast.error("Failed to delete lab"));
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent side={side} sideOffset={sideOffset} className="w-60" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
                    <Link2 className="h-4 w-4 mr-2"/>
                    Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={onDelete}>
                    <Trash2 className="h-4 w-4 mr-2"/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}