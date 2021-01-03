import React from 'react'
import {Card, Button} from 'react-bootstrap';

function BoardListItem({board}) {
    
    const configInfo = ()=> {
        let infoStr = "";
        switch(board.boardStatus)
        {
            case 1:
                infoStr += "Watting";
             break;
             case 2:
                infoStr+= "Playing";
                break;
        }
        infoStr = `${infoStr}       Require password: ${board.isPrivate}`;
        return infoStr;
    }
    return (
        <Card className="board-card">
        <Card.Body>
            <Card.Title><b>Board Name: </b> {board.boardName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted"><b>Board ID: </b>{board._id}</Card.Subtitle>
            <Card.Text className="board-info">
                <div className="board-status">
                <p>Status: </p> <p className="text-muted ml-2">{configInfo()}</p>
                </div> 
            </Card.Text>
            <div className="board-button">
                <Button variant="success">Details</Button>
                <Button variant="info">Join Board</Button>
            </div>
           
        </Card.Body>
        </Card>
    )
}

export default BoardListItem;
