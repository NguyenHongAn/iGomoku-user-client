import React, {useState} from 'react'
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import '../UserList.css';



function UserListItem({user}) {

    const [isOpen, setIsOpen] = useState(false);

    const handlOpenDetail = () => setIsOpen(!isOpen);

    return (
        <tr className="table-flex" key={user._id}>
        <td className="username">
            <Button variant="link">
                {user.fullname}
            </Button>
            
            </td>
        <td className="elo-display"><FontAwesomeIcon color="yellow" icon={faTrophy}></FontAwesomeIcon> {user.elo}</td>
        <td>
            <Button className="btn-friend-request" variant="info" size='sm'>Challenge</Button>
        </td>
        </tr>
    )
}

export default UserListItem;
