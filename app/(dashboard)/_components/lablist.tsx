"use client";

import React from 'react'
import EmptySearch from './empty-search';
import EmptyFavourites from './empty-favourites';
import EmptyLabs from './empty-labs';

interface LabListProps {
    orgId: string;
    query: {
        search?: string;
        favourites?: string;
    }
}

const LabList = ({ orgId, query }: LabListProps) => {
    const data = [];

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
        {JSON.stringify(query)}
    </div>
  )
}

export default LabList