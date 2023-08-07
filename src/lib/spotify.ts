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
        params: {
          limit: 50,
        },
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

export async function getTopTracks(accessToken: string, timeRange: string) {
  try {
    const response = await axios.get(
      'https://api.spotify.com/v1/me/top/tracks',
      {
        params: {
          limit: 50,
          time_range: timeRange,
          offset: 0,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch top tracks:', error);
    throw error;
  }
}

export async function getTopArtists(accessToken: string, timeRange: string) {
  try {
    const response = await axios.get(
      'https://api.spotify.com/v1/me/top/artists',
      {
        params: {
          time_range: timeRange,
          limit: 50,
          offset: 0,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch top artists:', error);
    throw error;
  }
}

export async function getUserPlaylists(accessToken: string) {
  try {
    const response = await axios.get(
      'https://api.spotify.com/v1/me/playlists',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user playlists:', error);
    throw error;
  }
}
