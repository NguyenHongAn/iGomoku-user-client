
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
    
    const { boardID, boardStatus} = useSelector(state => ({
        boardID: state.match.boardID,
        //owner: state.match.owner,
        boardStatus: state.match.boardStatus,
    }));
    const {userID, jwtToken} = useSelector(state => ({
        userID: state.auth.userID,
        jwtToken: state.auth.jwtToken
    }));

    //const jwtToken = useSelector(state => state)
    const [currPlayer, setcurrPlayer] = useState("");
    const socket = useSelector(state => state.socket.socket);
    const [isWaiting, setisWaiting] = useState(true);
    const [isPrivate, setIsPrivate] = useState(false);
    const [password, setPassword] = useState("");
    const [owner, setOwner]  = useState({fullname: "???", elo: "????"});
    const [player, setPlayer]  = useState({fullname: "???", elo: "????"});
    const [currentBoard, setCurrentBoard] = useState([]);
    const [messages, setMessages] = useState([]);
    const [historySteps, setHistorySteps] = useState([]);
    const [winner, setWinner] = useState("");
    const [winningLine, setWinningLine] = useState([]);
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState("Waiting");
    const {addToast} = useToasts();
    const dispatch = useDispatch();
    const history = useHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const notifyStartGame = ()=>{
        addToast("Game Start",{
            appearance: "success",
            autoDismiss: true,
        })
    }

    useEffect(()=>{
        // if(boardID !== null)
        // {
        //     console.log("SSSS");
        //     socket.emit("request-online-user", {jwtToken, status: 2});
        // }
        socket.on("response-update-user-info", ({owner, player})=>{
            console.log(owner, player);
            setOwner(owner);
            setPlayer(player);
        });

        socket.on("start-game", ({stepNumber})=>{ 
            console.log("START GAME");
            //dispatch(ReduxAction.match.updateStatus(2));
            setcurrPlayer(stepNumber %2 ===0? owner._id:player._id);
            //localStorage.setItem("game-start", true);
            setisWaiting(false);
            notifyStartGame();
        });

        socket.on("response-current-player", ({stepNumber})=>{
            console.log(stepNumber);
            setcurrPlayer(stepNumber %2 ===0? owner._id:player._id);
        });

        socket.on("response-status", ({status}) =>{
            if (status === 2)
            {
                setStatus("Playing");
            }
        })

        socket.on("reponse-reconnect", ({board, stepNumber})=>{
            console.log("RECONNECT");
            setCurrentBoard(board);
            setcurrPlayer(stepNumber %2 ===0? owner._id:player._id);
            setisWaiting(false);
        });

        socket.on("receive-position", ({board, index, playerInfo, stepNumber}) =>{
            const newHistory = Array.from(historySteps);
            newHistory.push({index: index, player: playerInfo});
            //console.log(board);
            //setCurrentBoardBaseOnHistory(newHistory);
            setCurrentBoard(board);
            setHistorySteps(newHistory);
            setcurrPlayer(stepNumber %2 ===0? owner._id:player._id);
        });

        socket.on("response-time", ({time})=>{
            console.log(time);
            setTime(time);
        });

        socket.on("response-winner", ({line, winner})=>{
            setWinner(winner);
            setWinningLine(line);
            setStatus("Winning");
            console.log("WINNER: ", winner);
        });

        socket.on("response-time-out",({winner})=>{
            setWinner(winner);
            setWinningLine([]);
            setStatus("Winning");
            console.log("TIME-OUT-WINNER: ", winner);
        })
        return ()=>{
            socket.off("start-game");
            socket.off("reponse-reconnect");
            socket.off("receive-position");
            socket.off("response-update-user-info");
            socket.off("response-winner");
            socket.off("response-time-out");
            socket.off("response-time");
        }
    }, [notifyStartGame, owner, player, socket]);


    useEffect(()=>{
       const fetchData = async ()=>{
        try {
            const response = await axiosInstance.get(`/board/${boardID}`);
         
            console.log(response.data);
            const payload = {
                    owner: response.data.owner,
                    player: response.data.player,
                    eloGot: response.data.eloGot,
                    password: response.data.password,
                    boardStatus: response.data.boardStatus
            }

            setOwner(response.data.owner);
            if (response.data.player !== null)
            {
                console.log("update user info");
                setPlayer(response.data.player);
                socket.emit("request-update-user-info", {
                        boardID: response.data._id,
                        owner: response.data.owner,
                        player: response.data.player,
                });
            }

            setMessages(response.data.history.messages);
            setHistorySteps(response.data.history.history);
            setCurrentBoardBaseOnHistory(response.data.history.history);
            socket.emit("join-board", {boardID: response.data._id, userID: userID});

            if (response.data.player !== null) //inGame && do not require password
            {
                socket.emit('start-game', {boardID: response.data._id}); 
            }
            if (!response.data.isPrivate)
            {
                setIsPrivate(false);
            }

            // if (localStorage.getItem('game-start') === "true") {       
            //     console.log("request-reconnect");       
            //     socket.emit("request-reconnect", {boardID});
            //   }

            setPassword(response.data.password);

            dispatch(ReduxAction.match.updateInfo(payload));
          
        } catch (error) {
            console.log({error});  
            if(error.response.status === 401)
            {
                history.push("/auth/signin");
            }  
        }
    }
    fetchData();
    },[boardID, dispatch, history, socket, userID]);

    const setCurrentBoardBaseOnHistory=(historySteps)=>
    {
        const tempBoard = Array(20*20).fill(null);
        let k =0;
        for (let i=0;i<tempBoard.length;i++)
        {
            if (historySteps[k] && i === historySteps[k].index )
            {
                tempBoard[i]= historySteps[k].player;
                k++;
            }
        }
        setCurrentBoard(tempBoard);
    }

    const handleClick = (index) =>{
        console.log(currPlayer);
        if(currPlayer === userID && currentBoard[index] === null){
            console.log(`${currPlayer === owner._id?"owner ": "Player "}Make move`);

            socket.emit("send-position", {index});
        }
    }

    let winningMsg = "";
    if (winner !== "")
    {
        if (winner === owner._id)
        {
            winningMsg = `${owner.fullname} is a Winner`;
        }
        else
        {
            winningMsg = `${player.fullname} is a Winner`;
        }
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
                handleClick={handleClick}
                winningLine={winningLine}
               
                ></Board>                
                }
                </div>
            </Col>
            <Col sm={4} className="tab-list">
                <BoardInfo
                owner={owner}
                player={player}
                current={currPlayer}
                status={status}
                time={time}
                winner={winningMsg}>
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
