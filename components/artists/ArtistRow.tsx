import React from 'react';
import Row from 'react-bootstrap/Row';
import ArtistCol from "./ArtistCol";
import { Artist } from '../../types/artist.interface';

interface ArtistsProps {
  artists: Artist[];
}

const ArtistRow = ({ artists }: ArtistsProps) => {
    return (
        <Row>
        {artists.map((artist) => (
          <ArtistCol key={artist.id} artist={artist}/>
        ))}
        </Row>
    );
  };
  
  export default ArtistRow;
  