// Common pagination meta
export interface PaginationMetaTypes {
  total: number;
  page: number;
  totalPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Artist reference inside music
export interface MusicArtistTypes {
  id: string;
  name: string;
  image: string | null;
}

// Album reference inside music
export interface MusicAlbumTypes {
  id: string;
  title: string;
}

// Main Music entity
export interface MusicTypes {
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  audioUrl: string;
  duration: number | null;
  fileSize: number;
  artistIds: string[];
  albumId: string;
  genre: string;
  releaseDate: string | null;
  language: string;
  lyrics: string | null;
  playCount: number;
  downloadCount: number;
  likeCount: number;
  uploadedById: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  artists: MusicArtistTypes[];
  albumRel: MusicAlbumTypes;
}

// API response type
export interface GetAllMusicResponseTypes {
  success: boolean;
  statusCode: number;
  message: string;
  meta: PaginationMetaTypes;
  data: MusicTypes[];
}
