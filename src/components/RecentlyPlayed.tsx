import Image from 'next/image';
import { truncateString } from '@/lib/utils';
import { RecentlyPlayed } from '@/lib/interfaces';

interface RecentlyPlayedProps {
  recentlyPlayed: RecentlyPlayed | null;
}

const RecentlyPlayedTracks: React.FC<RecentlyPlayedProps> = ({
  recentlyPlayed,
}) => {
  return (
    <div className="h-32 bg-primary rounded-lg mt-2 flex-grow overflow-hidden recently">
      <div className="flex justify-center p-3">
        <Image src="/svg/clock.svg" alt="Clock" width={20} height={20} />
        <h1 className="pl-2 text-white text-sm font-bold">
          Recently Played Tracks
        </h1>
      </div>
      <div className="h-full overflow-y-auto pb-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 m-2">
          <tbody className="overflow-hidden">
            <tr className="text-md text-white font-medium">
              <td className=""></td>
              <td className=""></td>
              <td className=""></td>
              <td className="md:max-xl:hidden"></td>
            </tr>
            {recentlyPlayed?.items.map((item, index) => {
              const playedAtDate = new Date(item.played_at);
              const formattedTime = playedAtDate.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <tr
                  key={index}
                  className="text-white text-xxs hover:bg-gray-50 hover:text-gray-700"
                >
                  <td className="">{index + 1}</td>
                  <td className="whitespace-nowrap">
                    <a
                      href={item.track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {truncateString(item.track.name, 20)}
                    </a>
                  </td>
                  <td className="whitespace-nowrap">
                    <a
                      href={item.track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.track.artists[0].name}
                    </a>
                  </td>
                  <td className="font-thin md:max-xl:hidden">
                    {formattedTime}
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

export default RecentlyPlayedTracks;
