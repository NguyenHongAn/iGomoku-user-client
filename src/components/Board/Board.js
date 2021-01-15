import React, {useState, useEffect,useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import "./Board.css";

import Square from './Square/Square';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {faCircle} from "@fortawesome/free-regular-svg-icons";
import {ResultIdentification} from '../../utils/ResultIdentification';
import {boardConst} from './board.Cfg';

import {useToasts} from 'react-toast-notifications';

function Board({
    board,
    handleClick,
    winningLine
}) {

    const { boardID, owner} = useSelector(state => ({     
        owner: state.match.owner,
        boardID: state.match.boardID,
    }));
    const userID = useSelector(state => state.auth.userID);
    const socket = useSelector(state => state.socket.socket);
    const dispatch = useDispatch(); 
    // const [currBoard,setCurrBoard] = useState(
    //     stepNumber===0?historySteps[0].squares :historySteps[stepNumber].squares
    //     );
    //const [isXTurn, setIsXTurn] = useState(stepNumber% 2);
    const [isXTurn, setIsXTurn] = useState(
        userID === owner._id?true:false
    );
    const [position, setPosition] = useState(-1);
    const [winner,setWinner] = useState({});
    const [firstStep, setFirstStep] = useState(isXTurn);

    const {addToast}= useToasts();
    
    useEffect(()=>{},[]);
    // const handleClick = useCallback((i, isFromPlayer) =>{
    //     //tạo bàn cờ từ bàn cờ hiện tại
    //     let tempBoard = Array.from(currBoard).slice();
    //     //B1: nước đầu tiên do chủ bàn cờ đánh trước
    //     if(!firstStep){
    //         addToast(`watting for ${owner.fullname} make first move`, 
    //         { 
    //             appearance: 'success',
    //             autoDismiss: true,
    //         });
    //         return;
    //     }
       
    //      //B2: Kiểm tra xem van đấu đã hết thúc hay chưa
    //     if (ResultIdentification.calculateWinner(tempBoard,position,boardConst.SIZE_BOARD,boardConst.STEP)
    //     || tempBoard[i])
    //     {
    //         return;
    //     }
        
    //     //B3: Xác định lượt
    //     // is x turn
    //     if (isXTurn)
    //     {
    //         tempBoard[i] = 'X';
    //     }
    //     else{
    //         tempBoard[i] = "O";
    //     }
      
    //     //B4: cập nhật các thông số
    //     setCurrBoard(tempBoard);
    //     setIsXTurn(!isXTurn);
    //     setPosition(i);
      
    //     //B5: realtime lượt đánh 
    //     if(!isFromPlayer)
    //     {
    //         //console.log("sedding from");
    //         socket.emit("send_position", JSON.stringify({boardID,i}));
    //     }
        
    //     //B6: Lưu lịch sử các bước của ván đấu
    //     const newHistory = {
    //         squares: tempBoard,
    //         pos: i
    //     };
    //     dispatch({
    //         type: 'match/saveHistory',
    //         payload: newHistory
    //     });
    // },[addToast, boardID, currBoard, dispatch, firstStep, isXTurn, owner.fullname, position, socket])
    
    // useEffect(() =>{
    //     let tempBoard = Array.from(currBoard).slice();
    //     const result = ResultIdentification.calculateWinner(tempBoard,position,boardConst.SIZE_BOARD,boardConst.STEP);
    //     //ván đấu kết thúc
    //     if (result)
    //     {
    //         setWinner(result);
    //         console.log("Winning");
    //     }
    //     if (position !==-1 || !firstStep)
    //     {
    //         socket.on('receive_position', (data)=>{
    //             const receive = JSON.parse(data);
    //             console.log(`[Step recive]: ${data}`);
    //             setFirstStep(true);
    //             //handleClick(receive.position, true);
    //             const i = receive.i;
    //             if (result|| tempBoard[i])
    //             {
    //                 return;
    //             }
               
    //             //B3: Xác định lượt
    //             // is x turn
    //             if (isXTurn)
    //             {
    //                 tempBoard[i] = 'X';
    //             }
    //             else{
    //                 tempBoard[i] = "O";
    //             }
            
    //             //B4: cập nhật các thông số
    //             setCurrBoard(tempBoard);
    //             setIsXTurn(!isXTurn);
    //             setPosition(i);


    //             const newHistory = {
    //                 squares: tempBoard,
    //                 pos: i
    //             };
    //             dispatch({
    //                 type: 'match/saveHistory',
    //                 payload: newHistory
    //             });
    //         });
    //     }

    // },[currBoard, dispatch, firstStep, isXTurn, position, socket]);
    const setGridDisplay = () =>{
        return {
            "width": "70%",
            "height": "96%",
            "display": "grid",
            "gridTemplateColumns":`repeat(${boardConst.SIZE_BOARD},${100/boardConst.SIZE_BOARD}%)` ,
            "gridTemplateRows": `repeat(${boardConst.SIZE_BOARD},${100/boardConst.SIZE_BOARD}%)`,
            "border": "5px solid #34ebeb",
          }
    }

    return ( 
        <div style={setGridDisplay()}>
        {
            board.map((square,i)=>{
                return <Square position={i} handleClick={handleClick}
                    winningLine={                    
                        (winningLine.length !== 0 && winningLine.includes(i))?
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
    )
}

export default Board;
