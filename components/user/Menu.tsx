import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ArtistScroll from '../artists/Scroll';
import { Artist } from '../../types/artist.interface';

interface User {
  id: number;
  name: string;
  artists?: Artist[];
}

const UserMenu = ({user = null}: {user?: User | null}) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  
  const handleClose = () => setShow(false);
  const handleShow  = () => setShow(true);
  
  useEffect(() => {
    const handleRouteChange = () => {
      handleClose();
    };

    router.events.on('routeChangeStart', handleRouteChange); // Add route change

    return () => {
      router.events.off('routeChangeStart', handleRouteChange); // Remove event listener
    };
  }, [router.events]);

  if (!user) return (<></>);

  const artists     = user.artists || [];
  const hasArtists  = user.artists && user.artists.length > 0;
  const hasNoSolist = !user.artists || !user.artists.find((art) => art.is_ensemble === 0);

  return (
    <>
      <Button variant="outline-light btn-light-shadow" onClick={handleShow} style={{marginRight: "10px"}}>
        {user ? user.name : ''}
      </Button>

      <Offcanvas className="user-offcanvas" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>User Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {hasArtists ?
            <ArtistScroll artists={artists}/>
          : ''}
          {hasNoSolist ? 
            <Link href={`/artists/create/solist`}><h6>Create Solist</h6></Link>
          : ''}
            <hr/>
            <Link href={`/artists/create/ensemble`}><h6>Create Ensemble</h6></Link>
            <hr/>
            <Link href={`/settings`}><h6>Settings</h6></Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default UserMenu;