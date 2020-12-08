import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
const APIURL = process.env.REACT_APP_APIURL;

export default function SignupPage() {
  const { addToast } = useToasts();
  const [isLoading, setLoading] = useState(false);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  function validateForm() {
    return (
      username.length > 0 && password.length > 0 //&& password === repassword
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    axios
      .post(APIURL + "/users/signup", {
        fullname: fullname,
        username: username,
        password: password,
      })
      .then(function (response) {
        setLoading(false);
        addToast(response.data.msg, {
          appearance: "info",
          autoDismiss: true,
        });
        if (response.data.status === 1) window.location.href = "/login";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="signupPage">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal text-center">
          Signup to <span className="brand-red">i</span>
          <span className="brand-red">Go</span>
          <span className="brand-red">moku</span>
        </h1>
        <FormGroup controlId="fullname" bsSize="large">
          <FormLabel>Fullname</FormLabel>
          <FormControl
            autoFocus
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="username" bsSize="large">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
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
  );
}
