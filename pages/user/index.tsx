import React, { useContext } from 'react';
import UserContext from '../../context/User/UserContext';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import ArtistScroll from '../../components/artists/Scroll';

function User() {
  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const canCreateSolist = user ? user.artists.filter(art => art.is_ensemble !== 1).length < 1 : false;
  return (
    <Container fluid>
      <h3 className="my-container">{user ? user.name : ''}</h3>
      
      <h5 className="my-container">Artists</h5>
      {canCreateSolist ? 
        <Link href="/artists/create"><button>+ Artist</button></Link>
      : ''}
      {user && user.artists.length > 0 ?
        <ArtistScroll artists={user.artists}/>
      : ''}
    </Container>
  );
}

export default User
