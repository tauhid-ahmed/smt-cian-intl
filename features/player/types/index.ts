export interface Track {
  id: string | number;
  title: string;
  artist: string;
  album?: string;
  url: string;
  artwork: string;
  duration?: string;
}

export interface MusicPlayerContextType {
  isOpen: boolean;
  open: (track: Track, playlist?: Track[]) => void;
  close: () => void;
  currentTrack: Track | null;
  isPlaying: boolean;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  playTrack: (track: Track) => void;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  showPlaylist: boolean;
  setShowPlaylist: (value: boolean) => void;
  playlist: Track[];
  currentIndex: number;
  likedTracks: Set<string | number>;
  toggleLike: (trackId: string | number) => void;
  playerMode: "bottom" | "popout";
  setPlayerMode: (mode: "bottom" | "popout") => void;
}
