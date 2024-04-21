import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

const BrandLogo = () => (
  <Navbar.Brand href="/">
    <Image alt="multiverse-wave" src={`/multiversewave2.png`} rounded style={{ maxWidth: '100px' }} />
  </Navbar.Brand>
);

export default BrandLogo;
