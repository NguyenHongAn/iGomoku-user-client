import React, {useState, useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import './BoardContainer.css';
import Board from '../../components/Board/Board';
import DropdownHistory from '../../components/DropdownHistory/DropdownHistory';
import vs from '../../assets/img/vs-image.png';
import {useSelector} from 'react-redux';
import ChatFrame from '../../components/ChatFrame/ChatFrame';
import Loading from '../../components/Loading';
import {useHistory} from 'react-router-dom';

function BoardContainer() {
    
    const {owner, player, winner, status} = useSelector(state => ({
        owner: state.match.owner,
        player: state.match.player,
        winner: state.match.winner,
        status: state.match.status,
    }))
    const [isLoading, setisLoading] = useState(true);

    const history = useHistory();

    useEffect(()=>{
        if (status === 1)
        {
            setisLoading(true);
        }
        else if(status === -1)
        {
            history.push('/igmoku');
        }
        else{
            //setisLoading(false);
        }
    },[history, status]);

    
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
