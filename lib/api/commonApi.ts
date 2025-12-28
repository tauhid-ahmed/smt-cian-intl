// in this file we will add all common api calls for admin and users.

export interface ArtistsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    meta: {
        total: number;
        page: number;
        totalPage: number;
        limit: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
    data: {
        id: string;
        name: string;
        bio: string;
        image: string | null;
        banner: string | null;
        location: string;
        website: string;
        spotify: string;
        appleMusic: string;
        youtube: string;
        behindGallery: string[];
        instagram: string;
        twitter: string;
        facebook: string | null;
        tiktok: string;
        genres: string[];
        popularity: number;
        followers: number;
        awards: number;
        activeYearsStart: string;
        activeYearsEnd: string | null;
        createdAt: string;
        updatedAt: string;
    }[];
}
