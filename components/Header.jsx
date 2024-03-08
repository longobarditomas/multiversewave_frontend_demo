import React, { useContext } from "react";
import Link from "next/link";
import UserContext from '../context/User/UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Offcanvas from './user/Menu';

const Header = () => {
  const userContext = useContext(UserContext);
  const user = userContext.user;
  return (
    <Navbar expand="lg" variant="dark" className="transparent-navbar">
        <Container>
            <Navbar.Brand href="/">        
                <Image alt="multiverse-wave" src={`/multiversewave2.png`} rounded style={{maxWidth: '100px'}} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto d-flex w-100 align-items-center">
                    <Link href="/artists">Artists</Link>
                {/* Mobile view */}
                {user && (
                    <div className="d-lg-none" style={{marginTop: "4%"}}>
                        <Offcanvas user={user} />
                        <Link href="/auth/signout" className="btn btn-outline-danger btn-danger-shadow me-2">Sign out</Link>
                    </div>
                )}
                {/* Desktop view */}
                {user && (
                    <div className="ms-auto d-none d-lg-block">
                        <Offcanvas user={user} />
                        <Link href="/auth/signout" className="btn btn-outline-danger btn-danger-shadow me-2">Sign out</Link>
                    </div>
                )}
                {/* Mobile view */}
                {!user && (
                    <div className="d-lg-none" style={{marginTop: "4%"}}>
                        <Link href="/auth/signup" className="btn btn-outline-light btn-light-shadow me-2">Sign up</Link>
                        <Link href="/auth/signin" className="btn btn-outline-light btn-light-shadow me-2">Sign in</Link>
                    </div>
                )}
                {/* Desktop view */}
                {!user && (
                    <div className="ms-auto d-none d-lg-block">
                        <Link href="/auth/signup" className="btn btn-outline-light btn-light-shadow me-2">Sign up</Link>
                        <Link href="/auth/signin" className="btn btn-outline-light btn-light-shadow me-2">Sign in</Link>
                    </div>
                )}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
};

export default Header;