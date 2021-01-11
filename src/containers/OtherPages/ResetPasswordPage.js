import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import logoIGomoku from "../../assets/img/logo-igomoku.png";
import axiosInstance from "../../api";
import { useToasts } from "react-toast-notifications";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
const useStyles = makeStyles(styles);

function ResetPasswordPage() {
  const { addToast } = useToasts();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {}, []);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const validateInfo = () => {
    if (username === "" || email === "" || !validateEmail(email)) {
      addToast("Invalid information, please double check username and email.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    else {
      axiosInstance
      .post(`/auth/send-resetpassword-email`, {
        username: username,
        email: email,
        })
        .then(function (response) {
          if (response.status === 200) {
            addToast("An email contain reset password was sent, please check your mail box.", {
              appearance: "success",
              autoDismiss: true,
            });
            //setIsVerified(true);
          }
        })
        .catch(function (error) {
          console.log(error);
          addToast(error.response.data.message, {//
            appearance: "error",
            autoDismiss: true,
          });
        });
    }
  };

  return (
    <div>
      {!isVerified ? (
        <GridItem xs={6} sm={6} md={6} className={classes.navWrapper}>
          {" "}
          <GridContainer justify="center">
            <GridItem xs={8} sm={8} md={8}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4>Authenticate Information</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      inputProps={{
                        type: "text",
                        endAdornment: <div></div>,
                        autoComplete: "off",
                      }}
                    />
                    <CustomInput
                      labelText="Email"
                      id="email"
                      type="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      inputProps={{
                        type: "text",
                        endAdornment: <div></div>,
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      color="info"
                      size="lg"
                      onClick={() => validateInfo()}
                    >
                      Send Email to Reset Password
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>
      ) : (
        <div>
          An email contain reset password was sent, please check your mail box.
        </div>
      )}
    </div>
  );
}

export default ResetPasswordPage;
