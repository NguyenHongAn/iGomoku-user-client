import React, {useState, useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import './BoardContainer.css';
import Board from '../../components/Board/Board';
import {useSelector, useDispatch} from 'react-redux';
import ChatFrame from '../../components/ChatFrame/ChatFrame';
import {useHistory} from 'react-router-dom';
import {useToasts} from 'react-toast-notifications';
import ReduxAction from '../../store/actions';
import axiosInstance from '../../api';
import StartDialog from '../../components/Dialog/StartDialog';
import BoardInfo from '../../components/BoardInfo';

function BoardContainer() {
    
    const { boardID} = useSelector(state => ({
        boardID: state.match.boardID,
    }));

    const socket = useSelector(state => state.socket.socket);
    const [isWaiting, setisWaiting] = useState(true);
    const [isPrivate, setIsPrivate] = useState(false);
    const [password, setPassword] = useState("");
    const {addToast} = useToasts();
    const dispatch = useDispatch();
    const history = useHistory();
    const [currentBoard, setCurrentBoard] = useState([]);
    const [messages, setMessages] = useState([]);
    useEffect(()=>{
        socket.on("start-game", ({status})=>{
            console.log("start game");
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
            setMessages(response.data.history.messages);
            setCurrentBoardBaseOnHistory(response.data.history.history);
            socket.emit("join-board", {boardID});

            if (response.data.boardStatus === 2) //inGame && do not require password
            {
                socket.emit('start-game', {boardID: response.data._id}); 
            }
            if (!response.data.isPrivate)
            {
                setIsPrivate(false);
            }

            setPassword(response.data.password);

            dispatch(ReduxAction.match.updateInfo(payload));
        } catch (error) {
            console.log({error});  
            if(error.response.status ===401)
            {
                history.push("/auth/signin");
            }  
        }
    }
    fetchData();
    },[addToast, boardID, dispatch, history, socket]);

    const setCurrentBoardBaseOnHistory=(historySteps)=>
    {
        const tempBoard= Array(20*20).fill(null);
        let k =0;
        for (let i=0;i<tempBoard.length;i++)
        {
            if (historySteps[k] && i === historySteps[k].index )
            {
                tempBoard[i]=historySteps[k].player;
                k++;
            }
        }
        setCurrentBoard(tempBoard);
    }
    return (
        <Container fluid className="h-100 main-container">
        <Row>     
            <Col sm={8}>
                <div className="board-container">    
                {isWaiting?
                <StartDialog isOpen={isPrivate} password={password} boardID={boardID}></StartDialog>           //change
                : 
                <Board
                board={currentBoard}
                ></Board>   
                }
                </div>
            </Col>
            <Col sm={4} className="tab-list">
                <BoardInfo
                >
                </BoardInfo>
                <div className="chat-container"> 
                <ChatFrame message={messages}></ChatFrame>
                </div>
            </Col>
        </Row>
        
    </Container>
    )
}

export default BoardContainer;
