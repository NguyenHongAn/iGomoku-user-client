import React, {useState, useEffect} from 'react';
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
    const [isLogin, setIsLogin] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    let fullname = localStorage.getItem("fullname");

    // kiểm tra user đã login chưa để hiển thị app bar
    useEffect(() => {
      setIsLogin(isUserLogin());
    }, []);

    function isUserLogin(){
      return !(localStorage.getItem("jwtToken") === "invalid token :))");
    }

    function logout(){
      setIsLogin(false);
      localStorage.setItem("jwtToken", "invalid token :))");
      localStorage.setItem("fullname", "unknown :))");
      localStorage.setItem("userID", 0);
    }

  
  
    return (
        <div className="AppBar" >
        <Navbar className="bar-bg" expand="md">
          <Link className="navbar-brand" to="/">iGomoku</Link>
          {isLogin ? (<Link className="text-light nav-link welcome"> Welcome, {fullname}</Link>) : null}
          <NavbarToggler onClick={toggle}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isLogin ? (
                <React.Fragment>
                  <NavItem>
                    <Link className="text-light nav-link" to="/igomoku">Dashboard</Link>
                  </NavItem>
                  <NavItem>
                    <Link className="text-light nav-link" to="/auth/signin" onClick={logout}>Sign Out</Link>
                  </NavItem>
                </React.Fragment>
              ) : 
              (
                <React.Fragment>
                  <NavItem>
                    <Link className="text-light nav-link" to="/auth/signin">Sign In</Link>
                  </NavItem>
                  <NavItem>
                    <Link className="text-light nav-link" to="/auth/signup">Sign Up</Link>
                  </NavItem>
                </React.Fragment>
              )
              }
              <NavItem>
                <Link className="text-light nav-link" to="/faq">FAQ</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
}

export default AppBar;
