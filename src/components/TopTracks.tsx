import Image from 'next/image';
import { truncateString } from '@/lib/utils';
import { TopTracksProps } from '@/lib/interfaces';
import React from 'react';
import TopHeader from '@/components/TopHeader';

const TopTracks: React.FC<TopTracksProps> = ({
  topTracks,
  timeRange,
  handleTimeRangeChange,
}) => {
  return (
    <div className="h-32 bg-primary rounded-lg mt-2 flex-grow overflow-hidden pb-16 p-2">
      <TopHeader
        handleTimeRangeChange={handleTimeRangeChange}
        timeRange={timeRange}
        title="Tracks"
      />

      <div className="h-full overflow-y-auto overflow-x-hidden pb-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 m-2">
          <tbody className="overflow-hidden">
            <tr className="font-bold text-white text-lg">
              <td className="mr-6"></td>
              <td className=""></td>
              <td className=""></td>
              <td className=""></td>
            </tr>
            {topTracks?.items.map((item, index) => {
              const artistNames = item.artists
                .map((artist) => artist.name)
                .join(', ');

              return (
                <tr
                  key={index}
                  className="text-white text-xxs hover:bg-gray-50 hover:text-gray-700"
                >
                  <td className="">{index + 1}</td>
                  <td>
                    <Image
                      src={item.album.images[0].url}
                      alt="Album Cover"
                      width={48}
                      height={48}
                      className=""
                    />
                  </td>
                  <td className="flex items-center py-6">
                    <div>
                      <a
                        href={item.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-xs"
                      >
                        {truncateString(item.name, 40)}
                      </a>
                      <div className="text-gray-400 text-xs">
                        {truncateString(item.album.name, 40)}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap text-xxs py-6">
                    {truncateString(artistNames, 50)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopTracks;
