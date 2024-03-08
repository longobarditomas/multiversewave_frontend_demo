import React from 'react';
import Image from 'react-bootstrap/Image';
import Link from 'next/link';

interface Album {
    id: number;
    title: string;
    image_url: string;
}

const SpotifyItem = ({album = null}: {album?: Album | null}) => {
    if (!album) return (<></>);
    return (
        <div key={album.id} className="album-item">
            <Link href={`/spotify/${album.id}`}>
                <Image alt={album.title} src={album.image_url} rounded style={{width: "100%"}} />
                <p>{album.title}</p>
            </Link>
        </div>
    );
  };
  
  export default SpotifyItem;
  