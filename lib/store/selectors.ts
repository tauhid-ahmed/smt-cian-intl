import { RootState } from "./index";

// Auth Selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthModal = (state: RootState) => state.auth.authModal;

// Music Selectors
export const selectMusic = (state: RootState) => state.music;
export const selectCurrentTrack = (state: RootState) => state.music.currentTrack;
export const selectPlaylist = (state: RootState) => state.music.playlist;
export const selectIsPlaying = (state: RootState) => state.music.isPlaying;
export const selectIsPlayerOpen = (state: RootState) => state.music.isOpen;
export const selectLikedTracks = (state: RootState) => state.music.likedTracks;
export const selectIsTrackLiked = (trackId: string | number) => (state: RootState) =>
  state.music.likedTracks.includes(trackId);

// Cart Selectors
export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => state.cart.total;
export const selectCartItemCount = (state: RootState) => state.cart.itemCount;
export const selectIsCartOpen = (state: RootState) => state.cart.isOpen;

// UI Selectors
export const selectUI = (state: RootState) => state.ui;
export const selectTheme = (state: RootState) => state.ui.theme;
export const selectSidebarOpen = (state: RootState) => state.ui.sidebarOpen;
export const selectMobileMenuOpen = (state: RootState) => state.ui.mobileMenuOpen;
export const selectLoading = (state: RootState) => state.ui.loading;
export const selectNotifications = (state: RootState) => state.ui.notifications;

