export type ArtistType = {
  id: string;
  name: string;
  image: string | null;
};

export type PaginationMetaType = {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
};

export type ArtistListResponseType = {
  success: boolean;
  statusCode: number;
  message: string;
  meta: PaginationMetaType;
  data: ArtistType[];
};
