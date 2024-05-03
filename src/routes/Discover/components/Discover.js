import React from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../../api/fetchData';

export function Discover() {
  const { data: newReleases, isLoading: newReleasesLoading } = useQuery({
    queryKey: ["new-releases"],
    queryFn: async () => await getData('new-releases', 'albums'),
  })

  const { data: playlists, isLoading: playlistsLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => await getData('featured-playlists', 'playlists'),
  })

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getData('categories', 'categories'),
  })


  return (
    <div className="discover">
      {
        (newReleasesLoading || playlistsLoading || categoriesLoading) &&
          (newReleasesLoading !== false || playlistsLoading !== false || categoriesLoading !== false) ?
          <h2>LOADING...</h2> :
          <>
            <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
            <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
            <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
          </>
      }
    </div>
  )
}
