import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import makeRequest from "../../hooks/use-request";
import UserContext from '../../context/User/UserContext';
import ArtistDetail from "../../components/artists/Detail";
import ArtistScroll from "../../components/artists/Scroll";
import SpotifyScroll from "../../components/spotify/Scroll";
import YoutubeScroll from "../../components/youtube/Scroll";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Link from 'next/link';
import { Artist } from '../../types/artist.interface';

function ArtistPage() {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const user = userContext ? userContext.user : null;
  const { id } = router.query;
  const [artist, setArtist] = useState<Artist | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await makeRequest(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/artists/${id}`, "get");
        if (response && response.data) setArtist(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    if (id) fetchData();
  }, [id]);

  const spotifyLength = artist?.spotify_albums?.length ?? 0;
  const youtubeLength = artist?.youtube_videos?.length ?? 0;
  
  const renderSpotify = () => (
    <>
      <h5 className="my-container">Spotify</h5>
      <SpotifyScroll albums={artist?.spotify_albums ?? []}/>
    </>
  );

  const renderYoutube = () => (
    <>
      <h5 className="my-container">YouTube</h5>
      <YoutubeScroll videos={artist?.youtube_videos ?? []}/>
    </>
  );

  if (!artist) return (<></>);
  return (
    <Container fluid>
      <ArtistDetail artist={artist} user={user} />

      <br/>

      <Row>
        <Col md="6">
          {(artist.ensembles ?? []).length > 0 ? (
            <div>
              <ArtistScroll artists={artist.ensembles ?? []}/>
            </div>
          ) : ''}

          {artist.members && artist.members.length > 0 ? (
            <div style={{textAlign: 'center'}}>
              <div className="album-carousel">
                {artist?.members.map((member) => (
                  <div key={member.id} className="album-item" style={{textAlign: 'center'}}>
                    <Link href={`/artists/${member.id}`}>
                      <Image alt={`member-${member.id}`} src={`${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/images/artists/artist_${member.id}.jpg`} roundedCircle style={{width: "100%"}} />
                      <p style={{fontSize: "0.8rem", overflowWrap: 'break-word'}}>{member.name}</p>
                      <Badge bg={'secondary'}>{member.tags?.[0]?.name ?? ''}</Badge>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : ''}
        </Col>
      </Row>


      {spotifyLength > 0 && (spotifyLength >= youtubeLength) && renderSpotify()}
      {youtubeLength > 0 && renderYoutube()}
      {spotifyLength > 0 && (spotifyLength < youtubeLength) && renderSpotify()}

    </Container>
  );
}

export default ArtistPage;