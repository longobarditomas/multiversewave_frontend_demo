import React from 'react';
import Image from 'react-bootstrap/Image';
import Link from 'next/link';
import { Artist } from '../../types/artist.interface';

const ArtistItem = ({artist = null}: {artist?: Artist | null}) => {
    if (!artist) return (<></>);
    return (
        <div key={artist.id} className="album-item" style={{textAlign: 'center'}}>
            <Link href={`/artists/${artist.id}`}>
            <Image alt={artist.name} src={`${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/images/artists/artist_${artist.id}.jpg`} roundedCircle style={{width: "100%"}} />
            <p>{artist.name}</p>
            </Link>
        </div>
    );
};
  
export default ArtistItem;
  