import { useState } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image';
import { Artist } from '../../types/artist.interface';

const ArtistSettings = ({artist = null}: {artist?: Artist | null}) => {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow  = () => setShow(true);
  
  if (!artist) return (<></>);
  return (
    <>
      <Button variant="danger" onClick={handleShow} style={{marginLeft: "10px"}}>
        Settings
      </Button>

      <Offcanvas show={show} onHide={handleClose} className="artist-menu">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Artist Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <div className="artist-menu-image-container">
              <Image alt={artist.name} src={`${process.env.NEXT_PUBLIC_AWS_S3_BASE_URL}/images/artists/artist_${artist.id}.jpg`} roundedCircle />
            </div>
            <hr/>
            <Link href={`/artists/${artist.id}/edit`}><h6>Edit Artist</h6></Link>
            <hr/>
            <Link href={`/artists/${artist.id}/multimedia`}><h6>Multimedia</h6></Link>
            {artist.is_ensemble == 1 ? 
            <>
              <hr/>
              <Link href={`/artists/${artist.id}/members`}><h6>Members</h6></Link>
            </>
            : ''}
            {artist.is_ensemble == 0 ? 
            <>
              <hr/>
              <Link href={`/artists/${artist.id}/ensembles`}><h6>Ensembles</h6></Link>
            </>
            : ''}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ArtistSettings;