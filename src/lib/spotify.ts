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

export async function getCurrentlyPlaying(accessToken: string) {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/player', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch playback state:', error);
    throw error;
  }
}

export async function getRecentlyPlayed(accessToken: string) {
  try {
    const response = await axios.get(
      'https://api.spotify.com/v1/me/player/recently-played',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recently played tracks:', error);
    throw error;
  }
}
