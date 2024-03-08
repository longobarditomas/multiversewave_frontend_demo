import React from 'react';
import Link from 'next/link';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import { Artist } from '../../types/artist.interface';

const ArtistCol = ({artist = null}: {artist?: Artist | null}) => {
    if (!artist) return (<></>);
    return (
        <Col key={artist.id} className="artist-col" md="3" xs="6">
            <Link href={`/artists/${artist.id}`}>
            <Image alt={artist.name} src={`${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/images/artists/artist_${artist.id}.jpg`} roundedCircle />
            <p>{artist.name}</p>
            {artist.tags?.map(function(tag, index) {
                return (
                <Badge key={`badge-${tag.id}`} bg={'secondary'} style={{margin: "0 4px"}}>{tag.name}</Badge>
                );
            })}
            </Link>
        </Col>
    );
  };
  
  export default ArtistCol;
  