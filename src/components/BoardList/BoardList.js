import React from 'react';
import BoardListItem from './BoardListItem';
import {CardColumns} from "react-bootstrap";
import "./BoardList.css";

function BoardList({boards}) {
    const maps = Array(12).fill(1);

    return (
        <div>
            <CardColumns className="board-list">
            {   
                boards.map(board =>{
                    return <BoardListItem board={board}>

                    </BoardListItem>
                })
            }
            </CardColumns>
        </div>
    )
}

export default BoardList;
