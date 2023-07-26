import React from 'react';
import { TopArtistsProps } from '@/lib/interfaces';
import TopHeader from '@/components/TopHeader';

const TopGenres: React.FC<TopArtistsProps> = ({
  topArtists,
  timeRange,
  handleTimeRangeChange,
}) => {
  const getTopGenres = () => {
    const genresMap: { [genre: string]: number } = {};

    // Iterate through top artists and count genre occurrences
    topArtists?.items.forEach((artist) => {
      artist.genres.forEach((genre) => {
        if (genresMap[genre]) {
          genresMap[genre]++;
        } else {
          genresMap[genre] = 1;
        }
      });
    });

    // Convert genresMap into an array of objects for easier sorting
    const genresArray = Object.keys(genresMap).map((genre) => ({
      genre,
      count: genresMap[genre],
    }));

    // Sort the genres by count in descending order
    genresArray.sort((a, b) => b.count - a.count);

    return genresArray;
  };

  const topGenres = getTopGenres().slice(0, 12); // Get the first 12 genres

  // Get the highest count to determine the scale for the progress bar
  const maxCount = topGenres.length > 0 ? topGenres[0].count : 0;

  return (
    <div className="h-32 bg-primary rounded-lg mt-2 flex-grow overflow-hidden pb-16 p-2">
      <TopHeader
        handleTimeRangeChange={handleTimeRangeChange}
        timeRange={timeRange}
        title="Genres"
      />
      <div className="h-full overflow-y-auto overflow-x-hidden pb-10">
        <div className="mt-4 text-white font-semibold">
          {topGenres.map((genreData, index) => (
            <div key={index}>
              {`${index + 1}. ${genreData.genre}`}
              <div className="flex">
                <div
                  className="w-full bg-gray-200 rounded-l-full mb-2 px-4 h-8"
                  style={{
                    width: `${(genreData.count / maxCount) * 100}%`,
                    background:
                      'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.3) 75%, rgba(255,255,255,0) 90%)',
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopGenres;
