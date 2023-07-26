import Image from 'next/image';
import { truncateString } from '@/lib/utils';
import React from 'react';
import { TopArtistsProps } from '@/lib/interfaces';
import TopHeader from '@/components/TopHeader';

const CrownSVG = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mb-1 mr-1"
  >
    <path
      d="M27.1875 12.975L24.8813 23.1656C24.8356 23.3788 24.7169 23.5694 24.5458 23.7046C24.3747 23.8398 24.1618 23.9111 23.9438 23.9062H5.98129C5.76328 23.9111 5.5504 23.8398 5.37928 23.7046C5.20817 23.5694 5.08953 23.3788 5.04379 23.1656L2.81254 12.975C2.77499 12.8028 2.78674 12.6235 2.84643 12.4577C2.90613 12.2919 3.01136 12.1462 3.15004 12.0375C3.28911 11.9284 3.4562 11.8608 3.63204 11.8425C3.80787 11.8243 3.98528 11.8561 4.14379 11.9344L9.61879 14.5875L14.1563 6.5625C14.2381 6.41822 14.3566 6.29821 14.4999 6.21472C14.6432 6.13123 14.8061 6.08723 14.9719 6.08723C15.1378 6.08723 15.3006 6.13123 15.4439 6.21472C15.5872 6.29821 15.7058 6.41822 15.7875 6.5625L20.325 14.5969L25.8375 11.925C25.9972 11.8404 26.1779 11.8037 26.3579 11.8193C26.5379 11.835 26.7096 11.9024 26.8522 12.0133C26.9948 12.1242 27.1024 12.274 27.1619 12.4446C27.2213 12.6153 27.2303 12.7994 27.1875 12.975Z"
      fill="#FBBC04"
    />
  </svg>
);
const TopArtists: React.FC<TopArtistsProps> = ({
  topArtists,
  timeRange,
  handleTimeRangeChange,
}) => {
  return (
    <div className="h-32 bg-primary rounded-lg mt-2 flex-grow overflow-hidden pb-16 p-2">
      <TopHeader
        handleTimeRangeChange={handleTimeRangeChange}
        timeRange={timeRange}
        title="Artists"
      />
      <div className="h-full overflow-y-auto overflow-x-hidden pb-10">
        <div className="grid grid-cols-3 gap-4 mt-4">
          {topArtists?.items.map((artist, index) => {
            return (
              <div
                key={index}
                className="rounded-lg p-2 flex flex-col items-center text-white"
              >
                <div className="mb-2">
                  <Image
                    src={artist.images[0]?.url || '/default-artist-image.png'} // Use a default image in case the artist has no image
                    alt="Artist Image"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center">
                  <a
                    href={artist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-xs"
                  >
                    <div className="flex items-center">
                      {index === 0 ? <CrownSVG /> : `${index + 1}. `}
                      {truncateString(artist.name, 40)}
                    </div>
                  </a>
                  <div className="text-gray-400 text-xs">
                    {/* You can display additional information about the artist if needed */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopArtists;
