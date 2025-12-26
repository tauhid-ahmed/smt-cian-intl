import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Track {
  id: string | number;
  title: string;
  artist: string;
  album?: string;
  url: string;
  artwork: string;
  duration?: string;
}

interface MusicState {
  currentTrack: Track | null;
  playlist: Track[];
  currentIndex: number;
  isPlaying: boolean;
  isOpen: boolean;
  isExpanded: boolean;
  showPlaylist: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  isShuffled: boolean;
  repeatMode: "off" | "all" | "one";
  likedTracks: (string | number)[];
  playerMode: "bottom" | "popout";
}

const initialState: MusicState = {
  currentTrack: null,
  playlist: [],
  currentIndex: 0,
  isPlaying: false,
  isOpen: false,
  isExpanded: false,
  showPlaylist: false,
  volume: 0.7,
  isMuted: false,
  currentTime: 0,
  duration: 0,
  isShuffled: false,
  repeatMode: "off",
  likedTracks: [],
  playerMode: "bottom",
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    openPlayer: (
      state,
      action: PayloadAction<{ track: Track; playlist?: Track[] }>
    ) => {
      const { track, playlist } = action.payload;
      if (playlist && playlist.length > 0) {
        state.playlist = playlist;
        const index = playlist.findIndex((t) => t.id === track.id);
        state.currentIndex = index >= 0 ? index : 0;
      } else {
        state.playlist = [track];
        state.currentIndex = 0;
      }
      state.currentTrack = track;
      state.isOpen = true;
      state.isPlaying = true;
    },
    closePlayer: (state) => {
      state.isOpen = false;
      state.isPlaying = false;
      state.isExpanded = false;
      state.showPlaylist = false;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    playTrack: (state, action: PayloadAction<Track>) => {
      const index = state.playlist.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index >= 0) {
        state.currentIndex = index;
        state.currentTrack = action.payload;
        state.isPlaying = true;
      }
    },
    playNext: (state) => {
      if (state.playlist.length === 0) return;

      if (state.repeatMode === "one") {
        state.currentTime = 0;
        return;
      }

      let nextIndex: number;
      if (state.isShuffled) {
        nextIndex = Math.floor(Math.random() * state.playlist.length);
      } else {
        nextIndex = (state.currentIndex + 1) % state.playlist.length;
      }

      state.currentIndex = nextIndex;
      state.currentTrack = state.playlist[nextIndex];
      state.isPlaying = true;
    },
    playPrevious: (state) => {
      if (state.playlist.length === 0) return;

      if (state.currentTime > 3) {
        state.currentTime = 0;
        return;
      }

      const prevIndex =
        state.currentIndex === 0
          ? state.playlist.length - 1
          : state.currentIndex - 1;
      state.currentIndex = prevIndex;
      state.currentTrack = state.playlist[prevIndex];
      state.isPlaying = true;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = Math.max(0, Math.min(1, action.payload));
      if (state.volume > 0) state.isMuted = false;
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setIsExpanded: (state, action: PayloadAction<boolean>) => {
      state.isExpanded = action.payload;
    },
    setShowPlaylist: (state, action: PayloadAction<boolean>) => {
      state.showPlaylist = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffled = !state.isShuffled;
    },
    toggleRepeat: (state) => {
      const modes: Array<"off" | "all" | "one"> = ["off", "all", "one"];
      const currentModeIndex = modes.indexOf(state.repeatMode);
      state.repeatMode = modes[(currentModeIndex + 1) % modes.length];
    },
    toggleLike: (state, action: PayloadAction<string | number>) => {
      const trackId = action.payload;
      const index = state.likedTracks.indexOf(trackId);
      if (index >= 0) {
        state.likedTracks.splice(index, 1);
      } else {
        state.likedTracks.push(trackId);
      }
    },
    setPlayerMode: (state, action: PayloadAction<"bottom" | "popout">) => {
      state.playerMode = action.payload;
      state.isExpanded = false;
    },
  },
});

export const {
  openPlayer,
  closePlayer,
  togglePlay,
  playTrack,
  playNext,
  playPrevious,
  setVolume,
  toggleMute,
  setCurrentTime,
  setDuration,
  setIsExpanded,
  setShowPlaylist,
  toggleShuffle,
  toggleRepeat,
  toggleLike,
  setPlayerMode,
} = musicSlice.actions;

export default musicSlice.reducer;

