import { Multimedia } from './multimedia.interface';

export interface Artist {
    id: number;
    name: string;
    about: string;
    is_ensemble: number;
    tags?: Tag[];
    members?: Artist[];
    ensembles?: Artist[];
    socials?: Social[] | undefined,
    spotify_albums?: Multimedia[] | undefined,
    youtube_videos?: Multimedia[] | undefined,
}
  
export interface Tag {
    id: number;
    name: string;
}

interface Social {
    social_id: number;
    code: string;
    social: {
        name: string;
    };
}
