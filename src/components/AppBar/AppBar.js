import React, {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
   
  } from 'reactstrap';
import './AppBar.css';  
import {Link} from 'react-router-dom';


function AppBar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
  
    return (
        <div>
        <Navbar className="bar-bg" expand="md">
          <Link className="navbar-brand" to="/">iGomoku</Link>
          <NavbarToggler onClick={toggle}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="text-light nav-link" to="/auth/signin">Sign In</Link>
              </NavItem>
              <NavItem>
                <Link className="text-light nav-link" to="/auth/Signup">Sign Up</Link>
              </NavItem>
              <NavItem>
                <Link className="text-light nav-link" to="/faq">FAQ</Link>
              </NavItem>
              <NavItem>
                <Link className="text-light nav-link" to="/igomoku">Dashboard</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
}

export default AppBar;
