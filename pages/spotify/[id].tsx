import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import makeRequest from "../../hooks/use-request";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Multimedia } from '../../types/multimedia.interface';

function SpotifyPage() {
  const router = useRouter();
  const { id } = router.query;
  const [multimedia, setMultimedia] = useState<Multimedia | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await makeRequest(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/multimedia/${id}`, "get", {});
        if (response.data) setMultimedia(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Container fluid>
      <Row className="artist-info my-container">
        <iframe style={{borderRadius:"12px"}} src={`https://open.spotify.com/embed/album/${multimedia?.external_id}?utm_source=generator`} width="100%" height="352" frameBorder="0" /* allowfullscreen="" */ allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </Row>
    </Container>
  );
}

export default SpotifyPage;