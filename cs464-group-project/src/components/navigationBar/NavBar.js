import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../../style/NavigationBar.css";

function NavBar() {
  return (
    //https://react-bootstrap.netlify.app/docs/components/navbar
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container className='nav-container'>
        <Navbar.Brand href='/'>Football Stats</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/team'>Team</Nav.Link>
            <Nav.Link href='/player'>Player</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    /*
        <Navbar color='secondary'>
            <Container>
                <Nav>
                    <NavItem>
                        <NavLink
                            className='nav-link text-dark fw-bold fs-4'
                            href='/'
                        >
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className='nav-link text-dark fw-bold fs-4'
                            href='/team'
                        >
                            Team
                        </NavLink>
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
        */
  );
}

export default NavBar;
