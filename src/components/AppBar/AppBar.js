import React, {useState, useEffect} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import './AppBar.css';  
import {Link, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import authActions from "../../store/actions/authAction";

function AppBar() {

    const [isLogin, setIsLogin] = useState(false);
   
    //redux
    const {jwtToken,fullname, userID} = useSelector(state => ({
          jwtToken: state.auth.jwtToken,
          fullname: state.auth.fullname,
          userID: state.auth.userID,
    }));
   
    const socket = useSelector(state => state.socket.socket);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() =>{
      
    });


    function logout(){
      setIsLogin(false);

      dispatch(authActions.signOut);
      socket.emit("sign-out", {userID});
    }

  
  
    return (
        <div className="AppBar" >
        <Navbar className="bar-bg" expand="md">
          <Link className="navbar-brand " to="/">iGomoku</Link>
          {jwtToken !== "invalid token :))"? (<Link className="text-light nav-link welcome" to="/profile"> Welcome, {fullname}</Link>) : null}
          <Navbar.Toggle  aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto" navbar>
              {jwtToken !== "invalid token :))"? (
                <React.Fragment>
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
      </div>
    )
}

export default AppBar;
