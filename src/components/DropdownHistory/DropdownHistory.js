import React from 'react';
import {Dropdown,Button, ButtonGroup } from 'react-bootstrap';
import {useSelector} from 'react-redux';


function DropdownHistory() {

    const {history} = useSelector(state => ({
      history: state.match.history,
    }));

    const jumpToMove = move =>{
      
    }

    return (
        <Dropdown style={{width: "50%"}} as={ButtonGroup}>
        <Button variant="dark" >Match History</Button>
      
        <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />
      
        <Dropdown.Menu>
          {
            history.map((step,i) =>{
              return <Dropdown.Item onClick={()=>{jumpToMove(i)}}>{`Step ${i}`}</Dropdown.Item>
            })
          }
        </Dropdown.Menu>
      </Dropdown>
    )
}

export default DropdownHistory;
