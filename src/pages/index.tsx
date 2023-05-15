import { useEffect, useState } from 'react';
import {
  fetchUserInfo,
  getCurrentlyPlaying,
  getRecentlyPlayed,
} from '@/lib/spotify';

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

interface RecentlyPlayed {
  items: {
    played_at: string;
    track: {
      artists: {
        name: string;
      }[];
      name: string;
      duration_ms: number;
    };
  }[];
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] =
    useState<CurrentlyPlaying | null>(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentlyPlayed | null>(
    null,
  );
  const [formattedDuration, setFormattedDuration] = useState<string>('');

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await fetch('/api/getAccessToken');
        const { accessToken } = await responses.json();
        console.log('fetchData accessToken', accessToken);

        const [currentlyPlayingResponse, recentlyPlayedResponse] =
          await Promise.all([
            getCurrentlyPlaying(accessToken),
            getRecentlyPlayed(accessToken),
          ]);

        console.log(currentlyPlayingResponse, 'currently playing');
        console.log(recentlyPlayedResponse, 'recently played');

        setCurrentlyPlaying(currentlyPlayingResponse);
        setRecentlyPlayed(recentlyPlayedResponse);

        // Calculate and format the duration for currently playing track
        if (currentlyPlayingResponse?.item?.artists[0]?.name) {
          const durationInSeconds = Math.floor(
            currentlyPlayingResponse.item.duration_ms / 1000,
          );
          const minutes = Math.floor(durationInSeconds / 60);
          const seconds = durationInSeconds % 60;
          setFormattedDuration(
            `${minutes}:${seconds.toString().padStart(2, '0')}`,
          );
        } else if (recentlyPlayedResponse?.items[0]?.track?.name) {
          // Calculate and format the duration for recently played track
          const durationInSeconds = Math.floor(
            recentlyPlayedResponse.items[0].track.duration_ms / 1000,
          );
          const minutes = Math.floor(durationInSeconds / 60);
          const seconds = durationInSeconds % 60;
          setFormattedDuration(
            `${minutes}:${seconds.toString().padStart(2, '0')}`,
          );
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
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
                  <p className="text-white font-bold whitespace-nowrap">
                    Hi,{' '}
                    {user.display_name.length > 10
                      ? `${user.display_name.substring(0, 10)}...`
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
                    <div className="text-white text-left">
                      Advertisement - Advertisement - Advertisement
                    </div>
                  )}
                  {currentlyPlaying?.currently_playing_type === undefined && (
                    <div
                      className={`text-white text-left ${
                        recentlyPlayed?.items[0]?.track.name
                          ? 'animation-slide-in-right'
                          : ''
                      }`}
                    >
                      {recentlyPlayed?.items[0]?.track.artists[0].name} -{' '}
                      {recentlyPlayed?.items[0]?.track.name}
                    </div>
                  )}
                </div>

                <div className="flex items-center">
                  <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                    <progress
                      className="w-full h-full bg-primary"
                      value={50}
                      max={100}
                    />
                  </div>
                  <p className="text-white text-[.6rem] ml-2">
                    {formattedDuration}
                  </p>
                </div>

                <p className="text-white text-[.6rem] text-left font-bold">
                  {currentlyPlaying?.device
                    ? `On ${currentlyPlaying.device.name}`
                    : 'No device active'}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="h-32 bg-primary rounded-lg mt-2 flex-grow overflow-hidden">
          <div className="flex items-center justify-between p-2">
            <h1 className="text-white text-lg font-bold">
              Recently Played Tracks
            </h1>
            <div className="flex items-center"></div>
          </div>
          <div className="">
            <table className="m-2">
              <thead>
                <tr className="bg-secondary text-white text-[.8rem] ici rounded-full">
                  <th className="">#</th>
                  <th className="">Title</th>
                  <th className="">Artist(s)</th>
                  <th className="">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentlyPlayed?.items.map((item, index) => {
                  const playedAtDate = new Date(item.played_at);
                  const formattedDate = playedAtDate.toLocaleDateString(
                    'en-US',
                    {
                      month: '2-digit',
                      day: '2-digit',
                      year: '2-digit',
                    },
                  );

                  return (
                    <tr key={index} className="text-white text-[.8rem]">
                      <td className=" ">{index + 1}</td>
                      <td className=" ">{item.track.name}</td>
                      <td className=" ">{item.track.artists[0].name}</td>
                      <td className=" ">{formattedDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
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
