import React, { useEffect } from 'react';
import { Navbar, Nav, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import './AppBar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from "../../store/actions/authAction";


function AppBar() {
  //redux
  const { jwtToken, fullname, userID, autoMatch } = useSelector(state => ({
    jwtToken: state.auth.jwtToken,
    fullname: state.auth.fullname,
    userID: state.auth.userID,
    autoMatch: state.auth.autoMatch,
  }));

  const socket = useSelector(state => state.socket.socket);
  const dispatch = useDispatch();
  //const location = useLocation();

  useEffect(() => {

  });


  function logout() {
    dispatch(authActions.signOut);
    dispatch({
      type: "match/restore"
    });
    socket.emit("sign-out", { userID });
  }



  return (
    <header className="AppBar" >
      <Navbar className="bar-bg" expand="md">
        <Link className="navbar-brand " to="/">
          <b style={{ color: 'red', marginLeft: "10px", marginRight: "10px", fontSize: "20px" }}>iGomoku</b>
        </Link>
        {jwtToken !== "invalid token :))" ?
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Auto find match"
            className="auto-switch"
            disabled={autoMatch}
          />
          : null}
        {jwtToken !== "invalid token :))" ? (<Link className="text-light nav-link welcome" to="/profile"> Welcome, {fullname}</Link>) : null}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto" navbar>
            {jwtToken !== "invalid token :))" ? (
              <React.Fragment>
                <Nav.Item>
                  <DropdownButton id="dropdown-basic-button" title="Friend Requests" variant="secondary" style={{color: "red"}}>
                    <Dropdown.Item  style={{color: "red"}} href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </DropdownButton>
                </Nav.Item>
                <Nav.Item>
                  <Link className="text-light nav-link" to="/igomoku">Dashboard</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className="text-light nav-link" to="/auth/signin" onClick={logout}>Sign Out</Link>
                </Nav.Item>
              </React.Fragment>
            ) :
              (
                <React.Fragment>
                  <Nav.Item>
                    <Link className="text-light nav-link" to="/auth/signin">Sign In</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link className="text-light nav-link" to="/auth/signup">Sign Up</Link>
                  </Nav.Item>
                </React.Fragment>
              )
            }
            <Nav.Item>
              <Link className="text-light nav-link" to="/faq">FAQ</Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default AppBar;
