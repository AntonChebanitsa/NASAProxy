import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

async function fetchMostRecentRoverImage(apiUrl: string | undefined, apiKey: string): Promise<any>{
  const url = `${apiUrl}/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${apiKey}`;
  const response = await axios.get(url, { httpsAgent: agent });

  return response.data;
}

export { fetchMostRecentRoverImage };
