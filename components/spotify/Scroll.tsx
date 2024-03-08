import React from 'react';
import SpotifyItem from "./Item";
import { Multimedia } from '../../types/multimedia.interface';
  
interface AlbumsProps {
    albums: Multimedia[];
}

const Scroll = ({ albums }: AlbumsProps) => {
    return (
        <div className="album-carousel">
            {albums.map((album) => (
                <SpotifyItem key={`album-${album.id}`} album={album}/>
            ))}
        </div>
    );
  };
  
  export default Scroll;
  