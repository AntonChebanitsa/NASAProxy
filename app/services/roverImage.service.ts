import { fetchMostRecentRoverImage } from '../repositories/roverImage.repository';

async function getMostRecentRoverImage(apiUrl: string | undefined, apiKey: string): Promise<string>{
  const data = await fetchMostRecentRoverImage(apiUrl, apiKey);

  if (data.latest_photos.length) {
    data.latest_photos.sort((a: { earth_date: string }, b: { earth_date: string }) =>
      new Date(b.earth_date).getTime() - new Date(a.earth_date).getTime());

    return data.latest_photos[0].img_src;
  } else {
    throw new Error('No photos available');
  }
}

export { getMostRecentRoverImage };
