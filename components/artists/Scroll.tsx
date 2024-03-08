import React from 'react';
import ArtistItem from "./Item";
import { Artist } from '../../types/artist.interface';

interface ArtistsProps {
    artists: Artist[];
}

const Scroll = ({ artists }: ArtistsProps) => {

    return (
        <div className="album-carousel slide-in-from-right">
            {artists.map((artist) => (
                <ArtistItem key={artist.id} artist={artist}/>
            ))}
        </div>
    );
};
  
export default Scroll;