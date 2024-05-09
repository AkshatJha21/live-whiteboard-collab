"use client";

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
  return (
    <div>LabCard</div>
  )
}

export default LabCard