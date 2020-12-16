import React, { useState } from "react";
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
// core components
import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";


import styles from "../../assets/jss/material-kit-react/views/profilePage.js";

const APIURL = process.env.REACT_APP_ENV === "dev" ? process.env.REACT_APP_APIURL : process.env.REACT_APP_API_DEPLOY_URL;

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const {userInfo} = props;
    const classes = useStyles();
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

    // element
    const [disabledField, setDisabledField] = useState(false);

    var onSetDisabledField = function () {
        setDisabledField(!disabledField);
    }

    var isDisabled = disabledField ? true : false;
    return (
        <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={8} sm={8} md={8}>
                    <Card className={classes[cardAnimaton]}>
                        <form className={classes.form} method="POST" action={APIURL + '/auth/edit-info'}>
                            <CardHeader color="info" className={classes.cardHeader}>
                                <h4>Edit Information</h4>
                                <div className={classes.socialLine}>
                                    <Button
                                        justIcon
                                        href="#pablo"
                                        target="_blank"
                                        color="transparent"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <TwitterIcon />
                                    </Button>
                                    <Button
                                        justIcon
                                        href="#pablo"
                                        target="_blank"
                                        color="transparent"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <FacebookIcon />
                                    </Button>
                                    <Button
                                        justIcon
                                        href="#pablo"
                                        target="_blank"
                                        color="transparent"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <InstagramIcon />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <CustomInput
                                    labelText="Fullname"
                                    id="fullname"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    defaultValue={userInfo.fullname}
                                    inputProps={{
                                        type: 'text',
                                        endAdornment: (<div></div>),
                                        autoComplete: "off"
                                    }}
                                />
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                                <Button simple color="info" size="lg">
                                    Get Changed
                                  </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>

    );
}
