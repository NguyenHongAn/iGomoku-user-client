import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import "./Board.css";
import BoardActions from '../../store/actions/boardAtions';
import Square from './Square/Square';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {faCircle} from "@fortawesome/free-regular-svg-icons";
import {ResultIdentification} from './ResultIdentification';
import {boardConst} from './board.Cfg';
import {boardActions} from '../../store/actions/boardAtions';


function Board() {

    const {stepNumber, history} = useSelector(state => ({
        stepNumber: state.board.stepNumber,
        history: state.board.history,
    }));
    const dispatch = useDispatch();

    const [currBoard,setCurrBoard] = useState(
        stepNumber===0?history[0].squares :history[stepNumber].squares
        );
    const [isXTurn, setIsXTurn] = useState(stepNumber% 2);
    const [position, setPosition] = useState(-1);
    const [winner,setWinner] = useState({});
    useEffect(() =>{
        let tempBoard = Array.from(currBoard).slice();
        
        const result = ResultIdentification.calculateWinner(tempBoard,position,boardConst.SIZE_BOARD,boardConst.STEP);
        //ván đấu kết thúc
        if (result)
        {
            setWinner(result);
            console.log("Winning");
        }

    },[currBoard, position]);

    const handleClick = (i) =>{
        //tạo bàn cờ từ bàn cờ hiện tại
        let tempBoard = Array.from(currBoard).slice();
         //B2: Kiểm tra xem van đấu đã hết thúc hay chưa
        if (ResultIdentification.calculateWinner(tempBoard,position,boardConst.SIZE_BOARD,boardConst.STEP)
        || tempBoard[i])
        {
            return;
        }

        //B3: Xác định lượt
        // is x turn
        if (isXTurn)
        {
            tempBoard[i] = 'X';
        }
        else{
            tempBoard[i] = "O";
        }
      
        //B4: cập nhật các thông số
        setCurrBoard(tempBoard);
        setIsXTurn(!isXTurn);
        setPosition(i);
      
        //B5: realtime lượt đánh 

        
        //B6: Lưu lịch sử các bước của ván đấu
        const newHistory = {
            squares: currBoard,
            pos: i
        };
        console.log(newHistory);
        dispatch(boardActions.saveHistory(newHistory));
    }

    const setGridDisplay = () =>{
        return {
  
            "justifyContent": "center",
            "display": "grid",
            "gridTemplateColumns":`repeat(${boardConst.SIZE_BOARD},2.7em)` ,
            "gridTemplateRows": `repeat(${boardConst.SIZE_BOARD},2.7em)`,
            "border": "5px solid #34ebeb",
          }
    }

    return (
        <div>
        <div style={setGridDisplay()}>
        {
            currBoard.map((square,i)=>{
                return <Square position={i} handleClick={handleClick}
                    winningLine={                    
                        (winner && winner.line && winner.line.includes(i))?
                        "active":null
                       }
                    >   
                    {square === "X"?
                        <FontAwesomeIcon icon={faTimes} color="red"></FontAwesomeIcon>
                    :(square === "O"?
                        <FontAwesomeIcon icon={faCircle}></FontAwesomeIcon>
                    :null)}
                </Square>
            })
        }
        </div>
      </div>
    )
}

export default Board;
