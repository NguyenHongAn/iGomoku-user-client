import React, {useState, useEffect} from 'react';
import UserList from '../../components/UserList/UserList';
import './Dashboard.css';
import {useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Row, Col, Container} from 'react-bootstrap';
import {useToasts} from 'react-toast-notifications';
import JoinBoardDialog from '../../components/Dialog/JoinBoardDialog';
import CreateBoardDialog from '../../components/Dialog/CreateBoardDialog';
import SearchBar from '../../components/SearchBar/SearchBar';
import BoardList from "../../components/BoardList/BoardList";
import axiosInstance from '../../api';
import ReduxAction from '../../store/actions';

function Dashboard() {

    const [openInviteDialog, setOpenInviteDialog] = useState(false);
    const openCreateDialog= useSelector(state => state.match.isOpen);
    const socket = useSelector(state => state.socket.socket);
    const boardList = useSelector(state => state.boardList.boards);
    const {jwtToken, userID} = useSelector(state=>({
        jwtToken: state.auth.jwtToken,
        userID: state.auth.userID
    }));
    const [player, setPlayer] = useState({});
    const dispatch = useDispatch();

    const history = useHistory();

    const handleInviteDialog = () => setOpenInviteDialog(!openInviteDialog);

    const handleCreateDialog = () => dispatch({type: "match/open", payload: !openCreateDialog});
    const {addToast} = useToasts();

    //change when realtime
    useEffect(()=>{
        if (jwtToken !== "invalid token :))")
        {
            socket.emit("request-online-user", {jwtToken});
        }

         //Nhận lời mời tham gia ván đấu từ người khác
         socket.on("invite-player", (info)=>{
            const dataRecive = JSON.parse(info);
            setOpenInviteDialog(!openInviteDialog);
            setPlayer(dataRecive);
        });

        //Lời mời tham gia ván đấu được chấp nhận
        socket.on("start-game", async (info)=>{  
            history.push(`/board/${info}`);
        });

        //create new board
        socket.on("new-board", async({newBoard})=>{
            dispatch(ReduxAction.boards.addNewBoard(newBoard));
            console.log("realtime");
        })

        return ()=>{
            socket.off("invite-player");
            socket.off("start-game");
            socket.off("new-board");
        }

    },[dispatch, history, jwtToken, openInviteDialog, socket]);
    
    //get data 
    useEffect(() =>{
        const fetchData = async() =>{
            try {
                const response = await axiosInstance.get("/iGomoku");
                
                let onlineUserList = response.data.users;
                //update list of playing board
                dispatch(ReduxAction.boards.updateBoardList(response.data.boards));
                console.log("featchDAta");
                // do not display yourself
                if(jwtToken !=="invalid token :))")
                {
                    onlineUserList = onlineUserList.filter(user =>{
                        if (user._id !== userID)
                        {
                            return user;
                        }
                        return null;
                    })
                }
                // sort by elo game
                onlineUserList.sort((a,b)=>{
                    return b.elo-a.elo;
                });

                //update list online users
                dispatch(ReduxAction.users.updateOnlineUserlist(onlineUserList));

                if (onlineUserList.length === 0)
                {
                    addToast("No other user online", {
                        appearance: 'info',
                        autoDismiss: true,
                    });
                }
            } catch (error) {
                console.log(error);
                addToast(error.respone.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                })
            }
        }
        fetchData();
       
    },[addToast, dispatch, jwtToken, userID]);

    return (
        
        <Container fluid className="h-100 main-container">
            <JoinBoardDialog show={openInviteDialog} 
            handleClose={handleInviteDialog} 
            player={player}>
            </JoinBoardDialog>
            <CreateBoardDialog show={openCreateDialog} 
            handleClose={handleCreateDialog}>
            </CreateBoardDialog>
            <Row>
                <Col sm={9}>
                
                    <SearchBar> </SearchBar>
                    <BoardList boards={boardList}></BoardList>
                
                </Col>
                <Col sm={3} className="tab-list">
                    <UserList></UserList>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;
