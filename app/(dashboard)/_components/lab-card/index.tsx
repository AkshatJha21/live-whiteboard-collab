"use client";

import Image from "next/image";
import Link from "next/link";
import Overlay from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface LabCardProps {
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    createdAt: number;
    imageUrl: string;
    orgId: string;
    isFavourite: boolean;
}

const LabCard = ({
    id,
    title,
    authorName,
    authorId,
    createdAt,
    imageUrl,
    orgId,
    isFavourite
}: LabCardProps) => {
    const { userId } = useAuth();
    const authorLabel = userId === authorId ? "You" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true
    })

    const { mutate: onFavourite, pending: pendingFavourite } = useApiMutation(api.lab.favourite);
    const { mutate: onRemoveFav, pending: pendingRemoveFav } = useApiMutation(api.lab.removeFavourite);

    const toggleFavourite = () => {
        if (isFavourite) {
            onRemoveFav({ id })
                .catch(() => toast.error("Failed to remove from favourites"));
        } else {
            onFavourite({ id, orgId })
                .catch(() => toast.error("Failed to add to favourites"));;
        }
    };

  return (
    <Link href={`/lab/${id}`}>
        <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
            <div className="relative flex-1 bg-zinc-50">
                <Image 
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-fit"
                />
                <Overlay />
                <Actions 
                    id={id}
                    title={title}
                    side="right"    
                >
                    <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                        <MoreHorizontal 
                            className="text-white opacity-75 hover:opacity-100 transition-opacity"
                        />
                    </button>
                </Actions>
            </div>
            <Footer 
                isFavourite={isFavourite}
                title={title}
                authorLabel={authorLabel}
                createdAtLabel={createdAtLabel}
                onClick={toggleFavourite}
                disabled={pendingFavourite || pendingRemoveFav}
            />
        </div>
    </Link>
  )
};

LabCard.Skeleton = function LabCardSkeleton() {
    return (
        <div className="aspect-[100/127] rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full"/>
        </div>
    )
}

export default LabCard