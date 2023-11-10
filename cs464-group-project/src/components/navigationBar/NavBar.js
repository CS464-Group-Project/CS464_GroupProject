import React from 'react';
import { Navbar, Nav, NavItem, NavLink, Container } from 'reactstrap';
import '../../style/NavigationBar.css';

function NavBar() {
    return (
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
    );
}

export default NavBar;
