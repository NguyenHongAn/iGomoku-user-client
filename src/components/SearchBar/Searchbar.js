import React from 'react';
import {Form, Button, FormControl, InputGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,faPlus, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import ReduxAction from '../../store/actions';
import axiosInstance from '../../api';
import { Prompt } from "react-st-modal";

function SearchBar() {
    const openCreateDialog = useSelector(state => state.match.isOpen);
    const userID = useSelector(state => state.auth.userID);
    const history = useHistory();
    const dispatch = useDispatch();
    const handleCreateDialog = () => {  
        if (userID === "0")
        {
            history.push('/auth/signin');
            return;
        }
        dispatch({type: "match/open", payload: !openCreateDialog});
    };

    const checkFiltering = function(e) {
        dispatch(ReduxAction.boards.filterBoardList(e.target.value));
    }

    const joinBoard = async (boardID) =>{
        //anomynous user can not watcher the game
        if (userID === "0")
        {
            history.push('auth/signin');
            return ;
        }
        try {
            //prepare data to post 
            const data = {
              boardID: boardID,
              userID: userID
            }
            //get response 
            const response = await axiosInstance.post('/board/on-join', data);
            const newMatch = {
                boardID: response.data._id,
                boardName: response.data.boardName,
                owner: response.data.owner,         //id người tạo
                player: response.data.player,       //id người chập nhận lời mời cũng là người chơi
                role: response.data.role
              };

              dispatch(ReduxAction.match.startNewMatch(newMatch));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Form inline style={{"marginTop": "10px"}}>
        <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
            type="text"
            placeholder="Find board by board ID...."
            className="search-bar"
            id="filter-input"
            onChange={(e) => {checkFiltering(e);}}
          />
        </InputGroup>
        {/* <FormControl
            type="text"
            placeholder="Find board by board ID...."
            className="search-bar"
            id="filter-input"
            onChange={(e) => {checkFiltering(e);}}
          /> */}
        <Button variant="info" className="search-btn" onClick={async () => {
                  const joinBoardID = await Prompt("Join Board", {
                    title: "What is your Board ID?",
                    isRequired: true,
                    okButtonText: "Join",
                    cancelButtonText: "Cancel",
                  });

                  if (joinBoardID) {
                    joinBoard(joinBoardID);
                  }
                }}>
            <FontAwesomeIcon icon={faSignInAlt}></FontAwesomeIcon>
            <span> Join Board</span>
        </Button>
        <Button variant="warning" className="search-btn"
        onClick={handleCreateDialog}>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            <span> New Board</span>
        </Button>
        </Form>
    )
}

export default SearchBar;
