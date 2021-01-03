import React, {useState, useEffect} from 'react';
import UserList from '../../components/UserList/UserList';
import './Dashboard.css';
import {useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Row, Col, Container} from 'react-bootstrap';
import {useToasts} from 'react-toast-notifications';
import JoinBoardDialog from '../../components/Dialog/JoinBoardDialog';
import CreateBoardDialog from '../../components/Dialog/CreateBoardDialog';
import SearchBar from '../../components/SearchBar/Searchbar';
import BoardList from "../../components/BoardList/BoardList";
import axiosInstance from '../../api';
import boardListReducer from '../../store/reducers/boardListReducer';


function Dashboard() {

    const [openInviteDialog, setOpenInviteDialog] = useState(false);

    const openCreateDialog= useSelector(state => state.match.isOpen);
    const socket = useSelector(state => state.socket.socket);
    const boardList = useSelector(state => state.boardList.boards);
    const [player, setPlayer] = useState({});
    const dispatch = useDispatch();

    const history = useHistory();

    const handleInviteDialog = () => setOpenInviteDialog(!openInviteDialog);

    const handleCreateDialog = () => dispatch({type: "match/open", payload: !openCreateDialog});
    const {addToast} = useToasts();

    useEffect(() =>{
        const fetchData = async() =>{
            try {
                const response = await axiosInstance.get("/board/list");
                
                dispatch({
                    type: "boards/update",
                    payload: response.data,
                });
                console.log(boardList);
            } catch (error) {
                console.log(error);
                addToast(error.respone.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                })
            }
        }
        fetchData();

        //Nhận lời mời tham gia ván đấu từ người khác
        socket.on("invite_player", (info)=>{
            const dataRecive = JSON.parse(info);
            setOpenInviteDialog(!openInviteDialog);
            setPlayer(dataRecive);
        });

        //Lời mời tham gia ván đấu được chấp nhận
        socket.on("start_game", async (info)=>{
           
            history.push(`/board/${info}`);
        });
       
    },[addToast, dispatch, history, openInviteDialog, setPlayer, socket]);

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
