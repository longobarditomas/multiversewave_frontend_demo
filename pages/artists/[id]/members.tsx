import React, { useEffect, useState, useContext, FormEvent } from 'react';
import makeRequest from "../../../hooks/use-request";
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserContext from '../../../context/User/UserContext';
import ArtistScroll from "../../../components/artists/Scroll";
import ArtistDetail from "../../../components/artists/Detail";
import { Artist } from '../../../types/artist.interface';

function ArtistMembers() {
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

  const [errors, setErrors] = useState<{ name: string[]; about: string[]; }>({
    "name": [],
    "about": []
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget);
    
    const inputs = event.currentTarget.querySelectorAll('input, select, textarea');
    for (const input of inputs) {
      if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement || input instanceof HTMLTextAreaElement) {
        formData.append(input.id, input.value);
      }
    }
    
    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        data[key] = value;
      } else {
        data[key] = value.name;
      }
    });
    data.artist_id = artist ? artist.id.toString() : '0';
  
    const response = await makeRequest(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/artists/store/member`, "post", data);
    if (response?.errors) setErrors(response.errors);
    else setArtist(response.data);
    
  }

  return (
    <Container>
      {artist ? 
        <ArtistDetail artist={artist} user={user} />
      : ''}
      <br/>
      <Row>
        <Col md="5">
          <Row>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="solist_id">
                  <Form.Label>Add Member</Form.Label>
                  <Form.Control type="name" placeholder="Enter Artist ID or username" />
              </Form.Group>
              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          </Row>
        </Col>
        
        <Col md="7">
          <Row className="artist-info">
            {(artist?.members ?? []).length > 0 ? (
              <div>
              <ArtistScroll artists={artist?.members ?? []}/>
              </div>
            ) : ''}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ArtistMembers;