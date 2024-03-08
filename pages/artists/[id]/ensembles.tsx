import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import UserContext from '../../../context/User/UserContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArtistScroll from "../../../components/artists/Scroll";
import ArtistDetail from "../../../components/artists/Detail";
import { Artist } from '../../../types/artist.interface';

function ArtistEnsembles() {
  const router = useRouter();
  const { id } = router.query;
  const stringId = Array.isArray(id) ? id[0] : id; 
  const userContext = useContext(UserContext);
  const user   = userContext ? userContext.user : null;
  const [artist, setArtist] = useState<Artist | undefined>(undefined);

  useEffect(() => {
    const foundArtist: Artist | undefined = user?.artists.find((art) => art.id === parseInt(stringId ?? '0')) as Artist | undefined;
    if (!foundArtist) router.push('/'); 
    setArtist(foundArtist);
  }, [user, stringId, router]);
  
  return (
    <Container fluid>
        {artist ? 
          <ArtistDetail artist={artist} user={user} />
        : ''}
        <br/>

        <Row>
          <Col md="6">
            {(artist?.ensembles ?? []).length > 0 ? (
              <div>
                <ArtistScroll artists={artist?.ensembles ?? []}/>
              </div>
            ) : ''}
          </Col>
        </Row>
    </Container>
  );
}

export default ArtistEnsembles;