import React from 'react';
import {Form, Button, FormControl, InputGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,faPlus } from "@fortawesome/free-solid-svg-icons";
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import ReduxAction from '../../store/actions';

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
        console.log(e.target.value);
        dispatch(ReduxAction.boards.filterBoardList(e.target.value));
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
        {/* <Button variant="info" className="search-btn">
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            <span> Join Board</span>
        </Button> */}
        <Button variant="warning" className="search-btn"
        onClick={handleCreateDialog}>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            <span> New Board</span>
        </Button>
        </Form>
    )
}

export default SearchBar;
