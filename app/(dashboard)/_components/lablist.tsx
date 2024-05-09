"use client";

import React from 'react'
import EmptySearch from './empty-search';
import EmptyFavourites from './empty-favourites';
import EmptyLabs from './empty-labs';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import LabCard from './lab-card';

interface LabListProps {
    orgId: string;
    query: {
        search?: string;
        favourites?: string;
    }
}

const LabList = ({ orgId, query }: LabListProps) => {
    const data = useQuery(api.labs.get, { orgId });

    if (data === undefined) {
        <div>
            Loading...
        </div>
    }

    if(!data?.length && query.search) {
        return (
            <EmptySearch />
        )
    }

    if(!data?.length && query.favourites) {
        return (
            <EmptyFavourites />
        )
    }

    if(!data?.length) {
        return (
            <EmptyLabs />
        )
    }

  return (
    <div>
        <h2 className='text-3xl'>
            {query.favourites ? "Favourite Labs" : "Team Labs"}
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 pb-10 mt-8'>
            {data?.map((lab) => (
                <LabCard 
                    key={lab._id} 
                    id={lab._id} 
                    title={lab.title} 
                    imageUrl={lab.imageUrl} 
                    authorId={lab.authorId} 
                    authorName={lab.authorName} 
                    createdAt={lab._creationTime} 
                    orgId={lab.orgId} 
                    isFavourite={false}
                />
            ))}
        </div>
    </div>
  )
}

export default LabList