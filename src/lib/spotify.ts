import axios from 'axios';

export async function fetchUserInfo(accessToken: string) {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user information:', error);
    throw error;
  }
}
