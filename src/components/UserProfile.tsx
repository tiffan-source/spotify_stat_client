import React from 'react';
import { CurrentlyPlaying, RecentlyPlayed, User } from '@/lib/interfaces';

interface UserProfileProps {
  user: User | null;
  currentlyPlaying: CurrentlyPlaying | null;
  recentlyPlayed: RecentlyPlayed | null;
  formattedDuration: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  currentlyPlaying,
  recentlyPlayed,
  formattedDuration,
}) => {
  return (
    <div className="h-32 bg-primary rounded-lg flex items-center overflow-hidden">
      {user && (
        <div className="flex">
          <div className="flex-col p-2 md:max-xl:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.images[0].url}
              width="60"
              height="60"
              alt="User Profile"
              className="rounded-full max-w-none"
            />
          </div>
          <div className="flex-col p-3">
            <div className="flex flex-row items-center">
              <p className="text-white font-bold whitespace-nowrap text-xs">
                Hi,{' '}
                {user.display_name.length > 10
                  ? `${user.display_name.substring(0, 10)}...`
                  : user.display_name}
              </p>

              <p
                className={`text-white text-[.5rem] font-bold mr-2 ${
                  currentlyPlaying?.is_playing ? 'bg-green-700' : 'bg-gray-700'
                } rounded-full w-14 h-6 flex items-center justify-center ml-2`}
              >
                {currentlyPlaying?.is_playing ? 'Active' : 'Inactive'}
              </p>
            </div>

            <div className="overflow-hidden">
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
              {currentlyPlaying?.currently_playing_type === 'episode' && (
                <div className="text-white text-left animation-slide-in-right">
                  Episode - Episode - Episode
                </div>
              )}
              {currentlyPlaying?.currently_playing_type === 'ad' && (
                <div className="text-white text-left animation-slide-in-right">
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

            <div className="flex items-center ici">
              <div className="h-1.5 bg-white rounded-full overflow-hidden">
                <progress className="h-full bg-primary" value={50} max={100} />
              </div>
              {currentlyPlaying?.currently_playing_type === undefined ||
              currentlyPlaying?.currently_playing_type === 'episode' ? (
                <p className="text-white text-[.6rem] text-left font-bold ml-2">
                  ∞
                </p>
              ) : (
                <p className="text-white text-[.6rem] text-left font-bold ml-2">
                  {formattedDuration}
                </p>
              )}
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
  );
};

export default UserProfile;
