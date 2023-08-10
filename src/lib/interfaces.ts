export interface User {
  display_name: string;
  images: {
    url: string;
  }[];
}

export interface CurrentlyPlaying {
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

export interface RecentlyPlayed {
  items: {
    played_at: string;
    track: {
      external_urls: {
        spotify: string;
      };
      artists: {
        name: string;
      }[];
      name: string;
      duration_ms: number;
    };
  }[];
}

export interface TopTracks {
  items: {
    album: {
      artists: {
        external_urls: {
          spotify: string;
        };
        name: string;
      }[];
      external_urls: {
        spotify: string;
      };
      images: {
        height: number;
        url: string;
        width: number;
      }[];
      name: string;
      release_date: string;
    };
    artists: {
      external_urls: {
        spotify: string;
      };
      name: string;
    }[];
    duration_ms: number;
    external_urls: {
      spotify: string;
    };
    name: string;
    preview_url: string;
  }[];
}

export interface TopTracksProps {
  topTracks: TopTracks | null;
  timeRange: string;
  handleTimeRangeChange: (event: any) => void;
}

export interface TopArtists {
  items: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    genres: string[];
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
    popularity: number;
  }[];
}

export interface TopArtistsProps {
  topArtists: TopArtists | null;
  timeRange: string;
  handleTimeRangeChange: (event: any) => void;
}

export interface UserPlaylistsProps {
  userPlaylists: IUserPlaylists | null;
}

export interface IUserPlaylists {
  items: {
    tracks: {
      href: string;
      total: number;
    };
    genres: {
      name: string;
      percentage: number;
    }[];
    collaborative: boolean;
    description: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
    owner: {
      display_name: string;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      type: string;
      uri: string;
    };
    primary_color: string;
    public: boolean;
    snapshot_id: string;
    type: string;
    uri: string;
  }[];
}
