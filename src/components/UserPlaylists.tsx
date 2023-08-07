import Image from 'next/image';
import { truncateString } from '@/lib/utils';
import { UserPlaylistsProps } from '@/lib/interfaces';
import React from 'react';

const PlaylistSVG = () => {
  const [hovered, setHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      className={`playlist-svg ${hovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <path
        d="M0 1.45281C0 0.650861 0.608769 0 1.35886 0H14.9474C15.3078 0 15.6535 0.153064 15.9083 0.425519C16.1631 0.697975 16.3063 1.0675 16.3063 1.45281C16.3063 1.83812 16.1631 2.20765 15.9083 2.48011C15.6535 2.75256 15.3078 2.90563 14.9474 2.90563H1.35886C0.608769 2.90563 0 2.25477 0 1.45281ZM1.35886 6.39238C0.998467 6.39238 0.652836 6.54545 0.398 6.8179C0.143165 7.09036 0 7.45989 0 7.8452C0 8.23051 0.143165 8.60004 0.398 8.87249C0.652836 9.14495 0.998467 9.29801 1.35886 9.29801H14.9474C15.3078 9.29801 15.6535 9.14495 15.9083 8.87249C16.1631 8.60004 16.3063 8.23051 16.3063 7.8452C16.3063 7.45989 16.1631 7.09036 15.9083 6.8179C15.6535 6.54545 15.3078 6.39238 14.9474 6.39238H1.35886ZM0 14.2376C0 13.4356 0.608769 12.7848 1.35886 12.7848H11.6862C12.0466 12.7848 12.3922 12.9378 12.647 13.2103C12.9019 13.4827 13.045 13.8523 13.045 14.2376C13.045 14.6229 12.9019 14.9924 12.647 15.2649C12.3922 15.5373 12.0466 15.6904 11.6862 15.6904H1.35886C0.608769 15.6904 0 15.0395 0 14.2376ZM15.2268 19.2504C15.2455 19.3913 15.2961 19.5252 15.3743 19.6404C15.4526 19.7556 15.556 19.8486 15.6755 19.9112C15.7951 19.9738 15.9272 20.0041 16.0603 19.9995C16.1934 19.995 16.3234 19.9556 16.4389 19.885L21.5895 16.7376C21.7142 16.6613 21.8179 16.5512 21.89 16.4183C21.962 16.2854 22 16.1346 22 15.981C22 15.8274 21.962 15.6765 21.89 15.5436C21.8179 15.4107 21.7142 15.3006 21.5895 15.2243L16.4389 12.077C16.3149 12.0012 16.1745 11.9617 16.0318 11.9622C15.889 11.9627 15.7489 12.0033 15.6254 12.0799C15.5019 12.1565 15.3993 12.2664 15.3281 12.3987C15.2568 12.531 15.2193 12.6809 15.2192 12.8336V19.1283C15.2192 19.1702 15.2214 19.2097 15.2268 19.2504Z"
        fill="white"
      />
    </svg>
  );
};

const AnalyzeSVG = () => {
  const [hovered, setHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={`analyze-svg ${hovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <path
        d="M7.5 1.25L9.15719 4.28031L12.1875 5.9375L9.15719 7.59469L7.5 10.625L5.84281 7.59469L2.8125 5.9375L5.84281 4.28031L7.5 1.25ZM14.0625 9.0625L15.1675 11.0825L17.1875 12.1875L15.1675 13.2925L14.0625 15.3125L12.9575 13.2925L10.9375 12.1875L12.9575 11.0825L14.0625 9.0625ZM7.5 15.625L8.0525 16.635L9.0625 17.1875L8.0525 17.74L7.5 18.75L6.9475 17.74L5.9375 17.1875L6.9475 16.635L7.5 15.625Z"
        fill="white"
      />
    </svg>
  );
};

const UserPlaylists: React.FC<UserPlaylistsProps> = ({ userPlaylists }) => {
  return (
    <div className="h-64 bg-primary rounded-lg pt-2 overflow-hidden">
      <div className="flex justify-center p-3 ">
        <PlaylistSVG />
        <h1 className="pl-2 text-white text-sm font-bold">
          Jordan&apos;s Playlists
        </h1>
      </div>
      <div className="h-full overflow-y-auto pb-10">
        {userPlaylists?.items.map((item, index) => {
          console.log('itemssss', item);
          return (
            <div
              key={index}
              className="flex items-center p-3 hover:bg-secondary cursor-pointer"
            >
              <div className="flex">
                <Image
                  src={item.images[0]?.url || 'https://via.placeholder.com/100'}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded-lg h-12 w-12"
                />
                <div className="pl-2 flex flex-col justify-between">
                  <h1 className="text-white text-sm font-bold">
                    {truncateString(item.name, 25)}
                  </h1>
                  <p className="text-gray-400 text-xs">
                    {item.tracks.total} Tracks • {item.owner.display_name}
                  </p>
                </div>
                <div className="pl-2 flex items-center">
                  <AnalyzeSVG />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserPlaylists;
