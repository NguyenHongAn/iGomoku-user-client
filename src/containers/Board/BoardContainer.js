import React, {useState, useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import './BoardContainer.css';
import Board from '../../components/Board/Board';
import vs from '../../assets/img/vs-image.png';
import {useSelector, useDispatch} from 'react-redux';
import ChatFrame from '../../components/ChatFrame/ChatFrame';
import {useHistory} from 'react-router-dom';
import {useToasts} from 'react-toast-notifications';
import ReduxAction from '../../store/actions';
import axiosInstance from '../../api';
import StartDialog from '../../components/Dialog/StartDialog';
import BoardInfo from '../../components/BoardInfo';

function BoardContainer() {
    
    const {winner,owner, player, boardID} = useSelector(state => ({
        winner: state.match.winner,
        //status: state.match.status,
        boardID: state.match.boardID,
        owner: state.match.owner,
        player: state.match.player,
        eloGot: state.match.eloGot
    }));
    const userID = useSelector(state => state.auth.userID);
    const socket = useSelector(state => state.socket.socket);
    const [status, setStatus] = useState(1);
    const [isWaiting, setisWaiting] = useState(true);
    const [password, setPassword] = useState("");
    const {addToast} = useToasts();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        socket.on("start-game", ({status})=>{
            console.log("start game");
            setStatus(status);
            setisWaiting(false);
        });

        return ()=>{
            socket.off("start-game");
        }
    }, [socket]);


    useEffect(()=>{
       const fetchData = async ()=>{
        try {
            const response = await axiosInstance.get(`/board/${boardID}`);
            console.log(response.data);
            const payload = {
                    owner: response.data.owner,
                    player: response.data.player,
                    eloGot: response.data.eloGot,
                    status: response.data.boardStatus,
                    password: response.data.password,
            }
            
            socket.emit("join-board", {boardID});

            if (response.data.boardStatus === 2) //inGame && do not require password
            {
                socket.emit('start-game', {boardID: response.data._id}); 
            }

            setPassword(response.data.password);

            dispatch(ReduxAction.match.updateInfo(payload));
        } catch (error) {
            console.log({error});   
        }
    }
    fetchData();
    },[addToast, boardID, dispatch, socket]);

    return (
        <Container fluid className="h-100 main-container">
        <Row>     
            <Col sm={8}>
                <div className="board-container">    
                {isWaiting?
                <StartDialog password={password} boardID={boardID}></StartDialog>           //change
                : <Board></Board>   
                }
                </div>
            </Col>
            <Col sm={4} className="tab-list">
                
                <BoardInfo></BoardInfo>
            
                <div className="chat-container"> 
                <ChatFrame></ChatFrame>
                </div>
            </Col>
        </Row>
        
    </Container>
    )
}

export default BoardContainer;
