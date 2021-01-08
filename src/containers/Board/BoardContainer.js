import React, {useState, useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import './BoardContainer.css';
import Board from '../../components/Board/Board';
import vs from '../../assets/img/vs-image.png';
import {useSelector, useDispatch} from 'react-redux';
import ChatFrame from '../../components/ChatFrame/ChatFrame';
import Loading from '../../components/Loading';
import {useHistory} from 'react-router-dom';
import {useToasts} from 'react-toast-notifications';
import ReduxAction from '../../store/actions';
import axiosInstance from '../../api';


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
    const {addToast} = useToasts();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
       (async ()=>{ 
        if (status === 1)
        {
            setisLoading(true);
        }
        else if(status === -1)
        {
            history.push('/igmoku');
        }
        
        try {
            const response = await axiosInstance.get(`/board/${boardID}`);
            console.log(response.data);
            const payload = {
                    owner: response.data.owner,
                    player: response.data.player,
                    eloGot: response.data.eloGot,
                    status: response.data.boardStatus,
            }
            dispatch(ReduxAction.match.updateInfo(payload));
        } catch (error) {
            console.log({error});
            addToast(error.response.data.message,{
                appearance: "error",
                autoDismiss: true,
            });           
        }
    })();
    },[addToast, boardID, dispatch, history, status]);

    
    return (
        <Container fluid className="h-100 main-container">
        {isLoading?
        <Loading></Loading>
        :null}
        {isLoading?
        <Row>
            <Col sm={8}>
                <div className="board-container">    
                    <Board></Board>   
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
                            {player?player.fullname : null}
                        </h1>
                    </div>
                    {/* <DropdownHistory></DropdownHistory> */}
                </div>
                <div className="chat-container"> 
                <ChatFrame></ChatFrame>
                </div>
            </Col>
        </Row>
        :null}
    </Container>
    )
}

export default BoardContainer;
