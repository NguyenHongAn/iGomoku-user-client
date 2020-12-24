import React, {useState, useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import './BoardContainer.css';
import Board from '../../components/Board/Board';
import DropdownHistory from '../../components/DropdownHistory/DropdownHistory';
import vs from '../../assets/img/vs-image.png';
import {useSelector, useDispatch} from 'react-redux';
import ChatFrame from '../../components/ChatFrame/ChatFrame';
import Loading from '../../components/Loading';
import {useHistory} from 'react-router-dom';
import {useToasts} from 'react-toast-notifications';

import axios from 'axios';
const APIURL = process.env.REACT_APP_ENV === "dev" ? process.env.REACT_APP_APIURL : process.env.REACT_APP_DEPLOY_APIURL;

function BoardContainer() {
    
    const {winner,owner, player, status, boardID} = useSelector(state => ({
        winner: state.match.winner,
        status: state.match.status,
        boardID: state.match.boardID,
        owner: state.match.owner,
        player: state.match.player,
        eloGot: state.match.eloGot
    }))
    const [isLoading, setisLoading] = useState(true);
    // const [owner,setOwner] = useState({});
    // const [player, setPlayer] = useState({});
    const {addToast} = useToasts();
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(()=>{
       const fetchData = async ()=>{ 
        if (status === 1)
        {
            setisLoading(true);
        }
        else if(status === -1)
        {
            history.push('/igmoku');
        }
        
        try {
            const response = await axios.get(`${APIURL}/board/${boardID}`);
            const dataReceive = response.data;
            //console.log({dataReceive});

            dispatch({
                type: "match/updateInfo",
                payload: {
                    owner: dataReceive.owner,
                    player: dataReceive.player,
                    eloGot: dataReceive.eloGot,
                    status: dataReceive.boardStatus,
                }
            });
            // setOwner(dataReceive.owner);
            // setPlayer(dataReceive.player);

        } catch (error) {
            console.log({error});
            addToast(error.response.data.message,{
                appearance: "error",
                autoDismiss: true,
            });           
        }
    };

        fetchData();
    },[addToast, boardID, dispatch, history, status]);

    
    return (
        <Container fluid className="h-100 main-container">
        {isLoading?
        <Loading></Loading>
        :null}
        {<Row>
            <Col sm={8}>
                <div className="board-container">
                {isLoading?
                    <Board></Board>
                    :<h2>Watting for player </h2>
                    }
                    
                </div>
            </Col>
            <Col sm={4} className="tab-list">
                <div className="record-dropdown"> 
                    <div className="username" style={{color: "red", textAlign: "center"}}>
                        <h1>
                        {owner.fullname}
                        </h1>
                    </div>
                    <img src={vs} alt="VS"/>
                    <div className="username "style={{textAlign: "center"}}>
                        <h1>
                            {player.fullname}
                        </h1>
                    </div>
                    <DropdownHistory></DropdownHistory>
                </div>
                <div className="chat-container"> 
                <ChatFrame></ChatFrame>
                </div>
            </Col>
        </Row>}
    </Container>
    )
}

export default BoardContainer;
