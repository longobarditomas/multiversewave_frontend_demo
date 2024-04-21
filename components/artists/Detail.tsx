import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import Offcanvas from './Menu';
import Socials from "./Socials";
import { Artist } from '../../types/artist.interface';
import { User } from '../../context/User/UserInterfaces';

const Detail = ({
    artist = null,
    user = null,
  }: {
    artist?: Artist | null,
    user: User | null,
  }) => {
    
    if (!artist) return (<></>);
    return (
        <Row className="artist-info my-container">
            <Col md={4} className="artist-image">
                <Image alt={artist.name} src={`${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/images/artists/artist_${artist.id}.jpg`} roundedCircle style={{minWidth: '300px', maxWidth: '300px'}} />
            </Col>
            <Col md={8} className="artist-details">
            <h1>
                {artist.name}
                {user && user.artists.some((art) => art.id === artist.id) ? <Offcanvas artist={artist} /> : ''}
            </h1>
            <p className="artist-description">{artist.about}</p>
            {artist.tags ?? [].length > 0 ? 
            <Stack direction="horizontal" gap={2}>
                {artist.tags?.map(function(tag, index) {
                return (
                    <Badge key={`artist-tag-${tag.id}`} bg={'secondary'}>{tag.name}</Badge>
                );
                })}
            </Stack>
            : ''}

            <br/>

            {artist.socials ?? [].length > 0 ? 
                <div>  
                {artist.socials?.map(function(social, index) {
                    return (
                    <Socials key={social.social_id} name={social.social?.name} code={social.code} />
                    );
                })}
                </div>
            : ''}

            </Col>
        </Row>
    );
  };
  
  export default Detail;
  