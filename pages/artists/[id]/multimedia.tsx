import React, { FormEvent, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faYoutube, faApple } from '@fortawesome/free-brands-svg-icons'
import makeRequest from "../../../hooks/use-request";
import UserContext from '../../../context/User/UserContext';
import ArtistDetail from "../../../components/artists/Detail";
import SpotifyScroll from "../../../components/spotify/Scroll";
import SpotifyDocs from "../../../components/spotify/Docs";
import YoutubeScroll from "../../../components/youtube/Scroll";
import YoutubeDocs from "../../../components/youtube/Docs";
import { Artist } from '../../../types/artist.interface';

function ArtistMultimedia() {
    
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

    const socials = {
      'spotify': artist?.socials?.filter((social) => social.social_id === 1)[0] ? artist?.socials.filter((social) => social.social_id === 1)[0].code : '',
      'youtube': artist?.socials?.filter((social) => social.social_id === 5)[0] ? artist?.socials.filter((social) => social.social_id === 5)[0].code : '',
      'apple': '',
    };

    const [spotifyId, setSpotifyId] = useState(socials?.spotify || '');
    const [youtubeId, setYoutubeId] = useState(socials?.youtube || '');

    const handleSpotifyIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSpotifyId(event.target.value);
    };

    const handleYoutubeIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setYoutubeId(event.target.value);
    };
    
    const [selected, setSelected] = useState("spotify");
    function setSelectedTest(sel:string) {
      setSelected(sel);
      var element = document.querySelector('.fa-'+sel);
      if (element) element.classList.add("fa-bounce");
      setTimeout(function() {
        if (element) element.classList.remove("fa-bounce");
      }, 2000); 
    }

    const [errors, setErrors] = useState<{ external_id: string[]; }>({
      "external_id": [],
    });

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        
        const formData = new FormData(event.currentTarget)

        const inputs = event.currentTarget.querySelectorAll('input, select, textarea');
        for (const input of inputs) {
          if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement || input instanceof HTMLTextAreaElement) {
            formData.append(input.id, input.value);
          }
        }
        const artistId = artist ? artist.id.toString() : '0';
        formData.append('artist_id', artistId);

        let url:string;
        if (selected === 'youtube') url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/artists/store/youtube/videos`;
        else if (selected === 'apple') url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/artists/store/spotify/albums`;
        else url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/artists/store/spotify/albums`;


        const response = await makeRequest(url, "post", formData);
        if (response?.errors) setErrors(response.errors);
        else {
          if (artist && response?.data) {
            const updatedArtist: Artist = { ...artist };
            if (selected === 'youtube') updatedArtist.youtube_videos = response.data;
            else updatedArtist.spotify_albums = response.data;
            setArtist(updatedArtist);
          }
        }
    }

  return (
    <div>
      <Container fluid>
        {artist ? 
          <ArtistDetail artist={artist} user={user} />
        : ''}
        <br/>
        <Row>
          <Col md="5" className="my-container">
            <Row>
              <Col style={{textAlign: "center"}}>
              {selected === "spotify" ? 
                <div style={{backgroundColor: "white", textAlign: "center", padding:"10px", borderRadius: "6%"}}>
                  <FontAwesomeIcon icon={faSpotify} className="fa-3x" style={{color: "green"}} />
                </div>
              : 
                <div style={{backgroundColor: "#D3D3D3", textAlign: "center", padding:"10px", borderRadius: "6%"}} onClick={() => setSelectedTest("spotify")}>
                  <FontAwesomeIcon icon={faSpotify} className="fa-3x" style={{color: "grey"}} />
                </div>
              }
              </Col>
              <Col style={{textAlign: "center"}}>
              {selected === "youtube" ? 
                <div style={{backgroundColor: "white", textAlign: "center", padding:"10px", borderRadius: "6%"}}>
                  <FontAwesomeIcon icon={faYoutube} className="fa-3x" style={{color: "red"}} />
                </div>
              : 
                <div style={{backgroundColor: "#D3D3D3", textAlign: "center", padding:"10px", borderRadius: "6%"}} onClick={() => setSelectedTest("youtube")}>
                  <FontAwesomeIcon icon={faYoutube} className="fa-3x" style={{color: "grey"}} />
                </div>
              }
              </Col>
              <Col style={{textAlign: "center"}}>
              {selected === "apple" ? 
                <div style={{backgroundColor: "white", textAlign: "center", padding:"10px", borderRadius: "6%"}}>
                  <FontAwesomeIcon id="fa-apple" icon={faApple} className="fa-3x" style={{color: "black"}} />
                </div>
              : 
                <div style={{backgroundColor: "#D3D3D3", textAlign: "center", padding:"10px", borderRadius: "6%"}} onClick={() => setSelectedTest("apple")}>
                  <FontAwesomeIcon icon={faApple} className="fa-3x" style={{color: "grey"}} />
                </div>
              }
              </Col>
            </Row>
            <br/>
            <br/>
            <Row>
              <Form onSubmit={onSubmit}>
              {selected === "spotify" ? 
                <Form.Group className="mb-3" controlId="external_id">
                    <Form.Label>Spotify Artist ID</Form.Label>
                    <Form.Control type="name" placeholder="Enter your Spotify Artist ID" value={spotifyId} onChange={handleSpotifyIdChange} />
                </Form.Group>
              : ''}
              {selected === "youtube" ? 
                <Form.Group className="mb-3" controlId="external_id">
                    <Form.Label>YouTube Channel ID</Form.Label>
                    <Form.Control type="name" placeholder="Enter your YouTube Channel ID" value={youtubeId} onChange={handleYoutubeIdChange} />
                </Form.Group>
              : ''}
              {selected === "apple" ? 
                <Form.Group className="mb-3" controlId="apple_id">
                    <Form.Label>Apple Username</Form.Label>
                    <Form.Control type="name" placeholder="Enter your Apple Username" value={socials?.apple} disabled />
                </Form.Group>
              : ''}
                <Button variant="primary" type="submit">Submit</Button>
              </Form>
            </Row>
          </Col>

          {selected === "spotify" ? 
          <Col md="7" className="multimedia-container">
            {(artist?.spotify_albums ?? []).length > 0 ? (
              <SpotifyScroll albums={artist?.spotify_albums ?? []}/>
            ) : 
              <SpotifyDocs />
            }
          </Col>
          : ''}

          {selected === "youtube" ? 
          <Col md="7" className="multimedia-container">
            {(artist?.youtube_videos ?? []).length > 0 ? (
              <YoutubeScroll videos={artist?.youtube_videos ?? []}/>
            ) : 
              <YoutubeDocs />
            }
          </Col>
          : ''}

          {selected === "apple" ? 
          <Col md="7" className="multimedia-container">
            <Alert key="danger" variant="danger">
              We&apos;re working hard to bring you this feature soon!
            </Alert>
          </Col>
          : ''}
          
        </Row>

      </Container>
    </div>
  );
}

export default ArtistMultimedia
