import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import './navbar.scss';

export function Menubar({ user }) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  return (

    <Navbar className='main-nav' sticky='top' expand='lg' variant='light' >
      <Container>
        <Navbar.Brand className='navbar-logo' href='/' >
          myFlixMovie
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>
                {user}
              </Nav.Link>
            )}
            {isAuth() && (
              <Button variant='link' onClick={() => {
                onLoggedOut()
              }}>
                Logout
              </Button>
            )}
            {!isAuth() && (
              <Nav.Link href='/'>
                Login
              </Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link href='/register'>
                Sign in
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}