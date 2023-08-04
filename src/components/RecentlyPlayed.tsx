import { truncateString } from '@/lib/utils';
import { RecentlyPlayed } from '@/lib/interfaces';
import React from 'react';

const ClockSVG = () => {
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
      width="25"
      height="25"
      viewBox="0 0 280 280"
      fill="none"
      id="clock"
      className={`clock-svg ${hovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <path
        d="M250.691 208.185C245.844 204.579 238.993 205.586 235.387 210.432C233.394 213.11 231.29 215.702 229.08 218.203C225.08 222.729 225.504 229.641 230.03 233.642C232.026 235.412 234.602 236.388 237.27 236.385C240.295 236.385 243.307 235.137 245.469 232.692C248.086 229.73 250.578 226.659 252.938 223.488C256.543 218.642 255.538 211.79 250.691 208.185ZM268.983 156.891C263.084 155.606 257.254 159.35 255.969 165.251C255.26 168.509 254.412 171.735 253.428 174.921C251.645 180.692 254.878 186.816 260.649 188.6C261.725 188.932 262.812 189.09 263.882 189.09C268.552 189.09 272.877 186.074 274.328 181.378C275.496 177.598 276.502 173.77 277.344 169.904C278.628 164.002 274.885 158.176 268.983 156.891ZM198.045 243.214C195.131 244.84 192.15 246.342 189.109 247.716C183.603 250.202 181.156 256.681 183.642 262.186C185.469 266.231 189.45 268.624 193.617 268.624C195.122 268.624 196.651 268.312 198.112 267.653C201.718 266.023 205.253 264.242 208.709 262.313C213.983 259.369 215.872 252.706 212.926 247.431C209.983 242.158 203.319 240.27 198.045 243.214Z"
        fill="white"
        className="hour-hand"
      />
      <path
        d="M269.062 23.5156C263.022 23.5156 258.125 28.4123 258.125 34.4531V64.8244C232.667 24.8981 188.208 0 140 0C102.605 0 67.4477 14.5627 41.0047 41.0047C14.5627 67.4477 0 102.605 0 140C0 177.395 14.5627 212.552 41.0047 238.995C67.4477 265.437 102.605 280 140 280C140.092 280 140.182 279.989 140.273 279.986C140.365 279.989 140.454 280 140.547 280C144.489 280 148.469 279.834 152.38 279.507C158.399 279.002 162.87 273.714 162.367 267.695C161.862 261.675 156.581 257.202 150.554 257.708C147.249 257.984 143.882 258.125 140.547 258.125C140.454 258.125 140.365 258.136 140.273 258.139C140.182 258.136 140.092 258.125 140 258.125C74.8655 258.125 21.875 205.134 21.875 140C21.875 74.8655 74.8655 21.875 140 21.875C181.977 21.875 220.586 44.2493 241.684 79.8438H211.609C205.569 79.8438 200.672 84.7405 200.672 90.7812C200.672 96.822 205.569 101.719 211.609 101.719H245C251.422 101.726 257.721 99.9559 263.198 96.6038C263.537 96.4115 263.865 96.2012 264.181 95.9738C273.699 89.7116 280 78.9398 280 66.7188V34.4531C280 28.4123 275.103 23.5156 269.062 23.5156Z"
        fill="white"
      />
      <path
        d="M140 56L140 151.021"
        stroke="white"
        strokeWidth="15"
        strokeLinecap="round"
      />
      <path
        d="M65 151H140"
        stroke="white"
        strokeWidth="15"
        strokeLinecap="round"
        className="minute-hand"
      />
    </svg>
  );
};

interface RecentlyPlayedProps {
  recentlyPlayed: RecentlyPlayed | null;
}

const RecentlyPlayedTracks: React.FC<RecentlyPlayedProps> = ({
  recentlyPlayed,
}) => {
  return (
    <div className="h-32 bg-primary rounded-lg mt-2 flex-grow overflow-hidden recently">
      <div className="flex justify-center p-3 recent">
        <ClockSVG />
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
