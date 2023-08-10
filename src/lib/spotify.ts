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
    const playlists = response.data.items;

    const items = await Promise.all(
      playlists.map(async (playlist: { id: any }) => {
        const tracksResponse = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const tracks = tracksResponse.data.items;

        const artistIds = tracks
          .filter((track: any) => track.track.artists.length > 0)
          .map((track: any) => track.track.artists[0].id)
          .filter(
            (value: string, index: number, self: string[]) =>
              self.indexOf(value) === index,
          )
          .slice(0, 50);

        if (artistIds.length > 0) {
          const artistsResponse = await axios.get(
            `https://api.spotify.com/v1/artists`,
            {
              params: {
                ids: artistIds.join(','),
              },
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          const genres = artistsResponse.data.artists.flatMap(
            (artist: any) => artist.genres,
          );

          // Count occurrences of each genre
          const genreCount: any = {};
          genres.forEach((genre: string) => {
            genreCount[genre] = (genreCount[genre] || 0) + 1;
          });

          const topGenres = Object.keys(genreCount)
            .sort((a, b) => genreCount[b] - genreCount[a])
            .slice(0, 3)
            .map((genre) => {
              return {
                name: genre,
                percentage: Math.round(
                  (genreCount[genre] / genres.length) * 100,
                ),
              };
            });

          return { ...playlist, genres: topGenres };
        }
      }),
    );

    return { items };
  } catch (error) {
    console.error('Failed to fetch user playlists:', error);
    throw error;
  }
}
