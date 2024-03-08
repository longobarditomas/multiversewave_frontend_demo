import { Artist } from '../../types/artist.interface';

export interface UserState {
    user: User | null;
}
  
export interface User {
    id: number;
    artists: Artist[];
    email: string;
    name: string;
}

export interface UserAction {
    type: string;
    payload?: any;
}
  
export interface AuthPayload {
    //
}
  