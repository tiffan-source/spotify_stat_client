import { useEffect, useState } from 'react';
import { fetchUserInfo, getCurrentlyPlaying } from '@/lib/spotify';

interface User {
  display_name: string;
  images: {
    url: string;
  }[];
}
interface CurrentlyPlaying {
  is_playing: boolean;
  currently_playing_type: string;
  item: {
    artists: {
      name: string;
    }[];
    name: string;
  };
  device: {
    name: string;
  };
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] =
    useState<CurrentlyPlaying | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/getAccessToken');
        const { accessToken } = await response.json();
        console.log('fetchUser accessToken', accessToken);
        const userInfo = await fetchUserInfo(accessToken);
        console.log(userInfo);
        setUser(userInfo);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  /*
  useEffect(() => {
    let expiresIn = 3600;
    const refreshAccessToken = async () => {
      try {
        const response = await fetch('/api/refreshAccessToken');
        const { access_token, expires_in } = await response.json();
        console.log('refreshAccessToken access_token', access_token);
        expiresIn = expires_in;
        const userInfo = await fetchUserInfo(access_token);
        setUser(userInfo);

        const expirationTimeMs = Date.now() + expiresIn * 1000;

        const tokenRefreshTimeout = setTimeout(
          refreshAccessToken,
          expirationTimeMs - Date.now(),
        );
        return () => clearTimeout(tokenRefreshTimeout);
      } catch (error) {
        console.error('Failed to refresh access token:', error);
      }
    };

    // Start the initial token refresh
    refreshAccessToken();
  }, []);
*/

  useEffect(() => {
    const fetchCurrentlyPlaying = async () => {
      try {
        const responses = await fetch('/api/getAccessToken');
        const { accessToken } = await responses.json();
        console.log('fetchCurrentlyPlaying accessToken', accessToken);
        const response = await getCurrentlyPlaying(accessToken);
        console.log(response, 'currently playing');
        setCurrentlyPlaying(response);
      } catch (error) {
        console.error('Failed to fetch currently playing track:', error);
      }
    };

    fetchCurrentlyPlaying();
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-5 gap-2 p-2">
      {/* Left column */}
      <div className="col-span-1 flex flex-col">
        <div className="h-32 bg-primary rounded-lg flex items-center overflow-hidden">
          {user && (
            <div className="flex">
              <div className="flex-col p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.images[0].url}
                  width="70"
                  height="70"
                  alt="User Profile"
                  className="rounded-full max-w-none"
                />
              </div>
              <div className="flex-col">
                <div className="flex flex-row items-center">
                  <p className="text-white font-bold">
                    Hello,{' '}
                    {user.display_name.length > 15
                      ? `${user.display_name.substring(0, 15)}...`
                      : user.display_name}
                  </p>

                  <p
                    className={`text-white text-[.5rem] font-bold mr-2 ${
                      currentlyPlaying?.is_playing
                        ? 'bg-green-700'
                        : 'bg-gray-700'
                    } rounded-full w-14 h-6 flex items-center justify-center ml-2`}
                  >
                    {currentlyPlaying?.is_playing ? 'Active' : 'Inactive'}
                  </p>
                </div>

                <div className=" overflow-hidden">
                  {currentlyPlaying?.currently_playing_type === 'track' && (
                    <div
                      className={`text-white text-left ${
                        currentlyPlaying?.item.name
                          ? 'animation-slide-in-right'
                          : ''
                      }`}
                    >
                      {currentlyPlaying?.item.name} -{' '}
                      {currentlyPlaying?.item.artists[0].name}
                    </div>
                  )}
                  {currentlyPlaying?.currently_playing_type === 'ad' && (
                    <div>Advertisement</div>
                  )}
                </div>

                <div className="flex items-center">
                  <div className="w-full h-1 bg-white rounded-full overflow-hidden">
                    <progress
                      className="w-full h-full bg-primary"
                      value={50}
                      max={100}
                    />
                  </div>
                </div>
                <p className="text-white text-[.6rem] text-left font-bold">
                  On {currentlyPlaying?.device.name}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="h-32 bg-primary rounded-lg mt-2 flex-grow"></div>
      </div>

      {/* Middle column */}
      <div className="col-span-3 flex flex-col">
        <div className="h-32 bg-primary rounded-lg"></div>
        <div className="h-32 bg-primary rounded-lg mt-2 flex-grow"></div>
      </div>

      {/* Right column */}
      <div className="col-span-1 flex flex-col">
        <div className="h-64 bg-primary rounded-lg"></div>
        <div className="h-72 bg-primary rounded-lg mt-2 flex-grow"></div>
      </div>

      {/* Bottom column */}
      <div className="col-span-5 rounded-lg bg-primary"></div>
    </div>
  );
}
