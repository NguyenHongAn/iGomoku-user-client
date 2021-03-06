import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link,useHistory } from "react-router-dom";

import { useToasts } from "react-toast-notifications";
const APIURL = process.env.REACT_APP_ENV === "dev" ? process.env.REACT_APP_APIURL : process.env.REACT_APP_DEPLOY_APIURL;



export default function SignupPage() {
  const { addToast } = useToasts();
  const [isLoading, setLoading] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //redux 
  // const {username, password} = useSelector(state => ({
  //   username: state.auth.username,
  //   password: state.auth.password,
  // }))

  const history = useHistory();

  function validateForm() {
    return (
      username.length > 0 && password.length > 0 //&& password === repassword
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    axios
      .post(APIURL + "/auth/signup", {
        username: username,
        password: password,
        fullname: fullname,
        email: email,
        permission: 1,  // normal user (0-admin, 1-user)
      })
      .then(function (response) {
        setLoading(false);
        if (response.status === 200) {
          addToast("Created successfully!", {
            appearance: "success",
            autoDismiss: true,
          });
          history.push("/auth/signin");
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
        addToast(error.response.data.message, {//
          appearance: "error",
          autoDismiss: true,
        });
      });
  }

  return (
    <>
    <div className="overlay"></div>
    <div className="signupPage">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal text-center">
          Signup to <span className="brand-red">i</span>
          <span className="brand-red">Go</span>
          <span className="brand-red">moku</span>
        </h1>
        <FormGroup controlId="fullname">
          <FormLabel>Fullname</FormLabel>
          <FormControl
            autoFocus
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="username">
          <FormLabel>Username</FormLabel>
          <FormControl
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        {/* <FormGroup controlId="repassword" bsSize="large">
          <FormLabel>Re-Password</FormLabel>
          <FormControl
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            type="password"
          />
        </FormGroup> */}
        <div className="btn-container">
          <Button
            className="btn btn-success btn-block btn-login"
            disabled={isLoading || !validateForm()}
            type="submit"
          >
            <FontAwesomeIcon className="icon" icon={faUserPlus} />
            {isLoading ? "Signing up..." : "Signup"}
          </Button>
        </div>
        <hr></hr>
        <div className="text-center">Already have an account?</div>
        <div className="btn-container">
          <Link to="/auth/signin">
            <Button className="btn btn-primary btn-block btn-signup">
              <FontAwesomeIcon className="icon" icon={faSignInAlt} /> Login
            </Button>
          </Link>
        </div>
      </form>
    </div>
    </>
  );
}
