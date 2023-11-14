import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../style/NavigationBar.css';

function NavBar() {
    return (
        //https://react-bootstrap.netlify.app/docs/components/navbar
        <Navbar expand='lg' className='navbar-container'>
            <Navbar.Brand href='/'>Football Stats</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'>
                    <Nav.Link href='/team'>Team</Nav.Link>
                    <Nav.Link href='/player'>Player</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
