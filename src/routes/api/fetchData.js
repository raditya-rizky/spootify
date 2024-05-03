import { API } from '../../config';

export async function getData(path, dataName) {
  try {
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
      `${API.baseUrl}/browse/${path}?locale=en_US`,
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

    return releasesData[dataName].items;
  } catch (error) {
    console.log(error);
  }
}