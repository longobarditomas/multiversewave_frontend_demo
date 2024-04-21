import React, { useContext } from "react";
import Link from "next/link";
import UserContext from '../../../context/User/UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import BrandLogo from './Logo';
import AuthLinks from './AuthButtons';

const Header = () => {
  const userContext = useContext(UserContext);
  const user = userContext.user;
  return (
    <Navbar expand="lg" variant="dark" className="transparent-navbar">
        <Container>
            <BrandLogo />
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto d-flex w-100 align-items-center">
                    <Link href="/artists">Artists</Link>
                    <AuthLinks user={user} />
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
};

export default Header;