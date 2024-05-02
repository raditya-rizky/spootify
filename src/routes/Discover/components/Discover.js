import React from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import { useQuery } from '@tanstack/react-query';
import { API } from '../../../config';

export function Discover() {
  async function signIn() {
    let data;

    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');

    const signed = await fetch(
      API.authUrl,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${API.clientId}:${API.clientSecret}`)}`
        },
        body: formData
      }
    );

    data = await signed.json();

    if (!data || !data.access_token) {
      throw new Error("Access token not received");
    }

    const releases = await fetch(
      `${API.baseUrl}/browse/new-releases?locale=en_US`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.access_token}`
        }
      }
    );

    if (!releases.ok) {
      throw new Error("Failed to fetch new releases");
    }

    const releasesData = await releases.json();

    return releasesData.albums.items;
  }


  const { data: newReleases } = useQuery({
    queryKey: ["new-releases"],
    queryFn: () => signIn()
  })

  console.log(newReleases);

  return (
    <div className="discover">
      <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={[]} />
      <DiscoverBlock text="BROWSE" id="browse" data={[]} imagesKey="icons" />
    </div>
  )
}
