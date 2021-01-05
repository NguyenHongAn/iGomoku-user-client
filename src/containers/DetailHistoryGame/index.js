import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

// core components
import Footer from "../../components/Footer/Footer.js";
import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Parallax from "../../components/Parallax/Parallax.js";
import profile from "../../assets/img/faces/male_avatar.png";
import axiosInstance from '../../api';
import BoardShow from './BoardShow';


import styles from "../../assets/jss/material-kit-react/views/profilePage.js";


const useStyles = makeStyles(styles);

export default function DetailHistoryGame(props) {
    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    const history = useHistory();

    // redux
    const { userId } = useSelector(state => ({
        jwtToken: state.auth.jwtToken,
        fullname: state.auth.fullname,
        userId: state.auth.userID
    }));

    const [basicInfo, setBasicInfo] = useState({});


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosInstance.get("/auth/profile/", {
                    params: {
                        userId: userId
                    }
                });
                if (response.status === 200) {
                    setBasicInfo(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <Parallax small filter />
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    <div>
                                        <img src={profile} alt="..." className={imageClasses} />
                                    </div>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>DETAIL GAME</h3>
                                        <h6>---oOo---</h6>
                                        <Button justIcon link className={classes.margin5}>
                                            <TwitterIcon />
                                        </Button>
                                        <Button justIcon link className={classes.margin5}>
                                            <InstagramIcon />
                                        </Button>
                                        <Button justIcon link className={classes.margin5}>
                                            <FacebookIcon />
                                        </Button>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className={classes.description}>
                            <p>
                                An artist of considerable range, Chet Faker — the name taken by
                                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                                and records all of his own music, giving it a warm, intimate
                                feel with a solid groove structure.{" "}
                            </p>
                        </div>
                        <GridContainer justify="left">
                            <GridItem xs={8} sm={8} md={8} className={classes.navWrapper}>
                                dsdas
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4} className={classes.navWrapper}>
                                aaaaa
                            </GridItem>
                            <GridItem xs={7} sm={7} md={7} className={classes.navWrapper}>
                                <BoardShow></BoardShow>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4} className={classes.navWrapper}>
                                aaaaa
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
