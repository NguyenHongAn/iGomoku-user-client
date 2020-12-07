import React, {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
import './AppBar.css';  

function AppBar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
  
    return (
        <div>
        <Navbar className="bar-bg" expand="md">
          <NavbarBrand href="/">iGomoku</NavbarBrand>
          <NavbarToggler onClick={toggle}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/auth/signin">Sign In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/auth/Signup">Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/auth/Signup">FAQ</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
}

export default AppBar;
