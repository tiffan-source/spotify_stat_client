import { useEffect, useState } from 'react';
import RecentlyPlayedTracks from '@/components/RecentlyPlayed';
import {
  fetchUserInfo,
  getCurrentlyPlaying,
  getRecentlyPlayed,
  getTopArtists,
  getTopTracks,
  getUserPlaylists,
} from '@/lib/spotify';

import TopTracks from '@/components/TopTracks';
import TopArtists from '@/components/TopArtists';

import {
  CurrentlyPlaying,
  RecentlyPlayed,
  User,
  IUserPlaylists,
} from '@/lib/interfaces';
import UserProfile from '@/components/UserProfile';
import TopGenres from '@/components/TopGenres';
import UserPlaylists from '@/components/UserPlaylists';
import { useTabBar } from '@/lib/useTabs';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] =
    useState<CurrentlyPlaying | null>(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentlyPlayed | null>(
    null,
  );
  const [topTracks, setTopTracks] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [timeRange, setTimeRange] = useState('medium_term');

  const [userPlaylists, setUserPlaylists] = useState<IUserPlaylists | null>(
    null,
  );

  const [formattedDuration, setFormattedDuration] = useState<string>('');
  const {
    tabsRef,
    activeTabIndex,
    tabUnderlineWidth,
    tabUnderlineLeft,
    setActiveTabIndex,
  } = useTabBar();
  const activeTab =
    activeTabIndex !== null
      ? ['tracks', 'artists', 'genres'][activeTabIndex]
      : 'tracks';

  const tabs = [
    {
      name: 'Top Tracks',
    },
    {
      name: 'Top Artists',
    },
    {
      name: 'Top Genres',
    },
  ];

  const handleTimeRangeChange = (event: any) => {
    setTimeRange(event.target.value);
  };

  let activeContent;
  if (activeTab === 'tracks') {
    activeContent = (
      <TopTracks
        topTracks={topTracks}
        timeRange={timeRange}
        handleTimeRangeChange={handleTimeRangeChange}
      />
    );
  } else if (activeTab === 'artists') {
    activeContent = (
      <TopArtists
        topArtists={topArtists}
        timeRange={timeRange}
        handleTimeRangeChange={handleTimeRangeChange}
      />
    );
  } else {
    activeContent = (
      <TopGenres
        topArtists={topArtists}
        timeRange={timeRange}
        handleTimeRangeChange={handleTimeRangeChange}
      />
    );
  }
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

        const [
          currentlyPlayingResponse,
          recentlyPlayedResponse,
          topTracksResponse,
          topArtistsResponse,
          userPlaylistsResponse,
        ] = await Promise.all([
          getCurrentlyPlaying(accessToken),
          getRecentlyPlayed(accessToken),
          getTopTracks(accessToken, timeRange),
          getTopArtists(accessToken, timeRange),
          getUserPlaylists(accessToken),
        ]);

        /*        console.log(currentlyPlayingResponse, 'currently playing');
        console.log(recentlyPlayedResponse, 'recently played');
        console.log(topTracksResponse, 'top tracks');
        console.log(topArtistsResponse, 'top artists');
        console.log(userPlaylistsResponse, 'user playlists');*/
        console.log(userPlaylistsResponse, 'user playlists');
        setCurrentlyPlaying(currentlyPlayingResponse);
        setRecentlyPlayed(recentlyPlayedResponse);
        setTopTracks(topTracksResponse);
        setTopArtists(topArtistsResponse);
        setUserPlaylists(userPlaylistsResponse);

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
  }, [timeRange]);

  return (
    <div className="min-h-screen grid grid-cols-5 gap-2 p-2">
      {/* Left column */}
      <div className="col-span-1 flex flex-col">
        <UserProfile
          currentlyPlaying={currentlyPlaying}
          user={user}
          recentlyPlayed={recentlyPlayed}
          formattedDuration={formattedDuration}
        />
        <RecentlyPlayedTracks recentlyPlayed={recentlyPlayed} />
      </div>

      {/* Middle column */}
      <div className="col-span-3 flex flex-col">
        <div className="h-32 bg-primary rounded-lg">
          <div className="flex flex-col justify-center h-full">
            <div className="flex relative h-16 gap-8  backdrop-blur-sm justify-between px-5">
              <span
                className="flex absolute bottom-0 top-0 -z-10 overflow-hidden rounded-3xl py-2 transition-all duration-300"
                style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
              >
                <span className="h-full w-full rounded-3xl bg-secondary"></span>
              </span>

              {tabs.map((tab, index) => {
                const isActive = activeTabIndex === index;

                return (
                  <button
                    key={index}
                    ref={(element) => (tabsRef.current[index] = element)}
                    className={`${isActive ? '' : 'hover:text-neutral-200'}
                my-auto cursor-pointer select-none text-center text-white font-bold px-4 py-2 rounded-full`}
                    onClick={() => {
                      setActiveTabIndex(index);
                    }}
                  >
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {activeContent}
      </div>
      {/* Right column */}
      <div className="col-span-1 flex flex-col">
        <UserPlaylists userPlaylists={userPlaylists} />
        <div className="h-72 bg-primary rounded-lg mt-2 flex-grow"></div>
      </div>

      {/* Bottom column */}
      <div className="col-span-5 rounded-lg bg-primary"></div>
    </div>
  );
}
