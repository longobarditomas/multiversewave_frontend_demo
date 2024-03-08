import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import makeRequest from "../../hooks/use-request";
import ArtistRow from '../../components/artists/ArtistRow';

function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await makeRequest(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/artists`, "get", {});
        if (response.data) setArtists(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h3>Artists</h3>
      {artists.length > 0 ?
        <ArtistRow artists={artists}/>
      : ''}
    </Container>
  );
}

export default Artists
