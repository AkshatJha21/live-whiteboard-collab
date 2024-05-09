"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface NewLabButtonProps {
    orgId: string;
    disabled?: boolean;
}

const NewLabButton = ({
    orgId,
    disabled
}: NewLabButtonProps) => {
    const { mutate, pending } = useApiMutation(api.lab.create);

    const onClick = () => {
        mutate({
            orgId,
            title: "Untitled"
        }).then((id) => {
            toast.success("Lab created");

        }).catch(() => toast.error("Something went wrong!"));
    }

  return (
    <button disabled={pending || disabled} onClick={onClick} className={cn(
        "col-span-1 aspect-[100/127] bg-blue-400 rounded-lg hover:bg-blue-500 transition-all flex flex-col items-center justify-center py-6",
        (pending || disabled) && "opacity-75 hover:bg-blue-400 cursor-not-allowed"
    )}>
        <div />
        <Plus className="h-12 w-12 text-white"/>
        <p className="text-sm text-white">
            New Lab
        </p>
    </button>
  )
}

export default NewLabButton