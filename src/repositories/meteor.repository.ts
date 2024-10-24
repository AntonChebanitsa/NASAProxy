import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

async function fetchAsteroidData(apiUrl: string | undefined, apiKey: string | undefined, startDate: string, endDate: string): Promise<any>{
  const url = `${apiUrl}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
  const response = await axios.get(url, { httpsAgent: agent });

  return response.data;
}

export { fetchAsteroidData };
