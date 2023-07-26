import React from 'react';

interface TopHeaderProps {
  title: string;
  timeRange: string;
  handleTimeRangeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  timeRange,
  handleTimeRangeChange,
}) => {
  return (
    <div className="flex justify-center p-3">
      <div>
        <h1 className="pl-2 text-white text-2xl font-bold">
          Jordan&apos;s Top {title}
        </h1>
        <div className="flex justify-center p-2">
          <div className="relative inline-block">
            <select
              value={timeRange}
              onChange={handleTimeRangeChange}
              className="focus:ring-4 focus:outline-none bg-transparent text-white font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center"
            >
              <option value="long_term">All Time</option>
              <option value="medium_term">Last 6 Months</option>
              <option value="short_term">Last 4 Weeks</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
