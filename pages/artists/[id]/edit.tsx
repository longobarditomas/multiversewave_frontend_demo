import React, {useState, useEffect, useContext} from 'react';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserContext from '../../../context/User/UserContext';
import ArtistForm from "../../../components/artists/Form";
import { Artist } from '../../../types/artist.interface';

function ArtistEdit() {

  const router = useRouter();
  const { id } = router.query;
  const stringId = Array.isArray(id) ? id[0] : id; 
  const userContext = useContext(UserContext);
  const user   = userContext ? userContext.user : null;
  const [artist, setArtist] = useState<Artist | undefined>(undefined);
  
  useEffect(() => {
    const foundArtist = user?.artists.find((art) => art.id === parseInt(stringId ?? '0'));
    if (!foundArtist) router.push('/'); 
    setArtist(foundArtist as Artist | undefined);
  }, [user, stringId, router]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6} lg={4} className="create-ensemble-column">
          <h1 className="text-center">Edit Artist</h1>
          {artist ? <ArtistForm artist={artist} isEnsemble={artist.is_ensemble ? 1 : 0} /> : <div>Loading...</div>}
        </Col>
      </Row>
    </Container>
  );
}

export default ArtistEdit