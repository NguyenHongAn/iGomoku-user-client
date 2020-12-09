import React, {useEffect, useState} from 'react';
import { Col,Nav,NavItem,NavLink, Button } from "reactstrap";
//import {connect, useDispatch, useSelector} from 'react-redux';
//import ListUserActions from '../../store/actions/listOnlUserAction';
import './UserList.css';
import {io} from "socket.io-client";

function UserList() {
    
    //redux map state to props and map dispatch to props
    // const {socket, listUser} = useSelector(state =>({
    //     listUser: state.listOnlUser.users,
    //     socket: state.listOnlUser.socket,
    // })
    // ); 
    // const dispatch = useDispatch();
    const [listUser, setListUser] = useState([
        {
            fullname: "Nguyen Hong",
            elo: 2000,
        },
        {
            fullname: "Thanh Hao",
            elo: 2000,
        },
        {
            fullname: "Minh Nguyet",
            elo: 2000,
        }
    ]);

    
    
    useEffect(() =>{
        const socket = io(process.env.REACT_APP_SERVER);

        socket.emit("user-list", )

        console.log(socket);
    },[]);

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className="table-pane ">
            <Nav color='dark' tabs className="tabs-header">
                <NavItem>
                    <NavLink className={activeTab === '1' ? 'active active-link' : ''} onClick={() => toggle('1')}>
                   Online  User
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={activeTab === '2' ? 'active active-link' : ''} onClick={() => toggle('2')}>
                        Friends 
                    </NavLink>
                </NavItem>
            </Nav>
            <div>
            <table >
                <tbody> 
                {
                    listUser.map((user,i) =>{
                        return (
                            <tr className="table-flex" key={i}>
                            <td className="username">
                                <Button color="link">
                                    {user.fullname}
                                </Button>
                                
                                </td>
                            <td># {user.elo}</td>
                            <td>
                                <Button className="btn-friend-request" size='sm'>Send</Button>
                            </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            </div>
            
            
        </div>
    )
}


// const mapState = (state) =>({
//     listUser: Array.from(state.listOnlUser.users),
//     socket: state.listOnlUser.socket,
//   });
  
// const mapDispatch = (dispatch) => ({
//     setupSocket: () =>{
//         dispatch(UserListActions.setupSocket());
//     }
    
// });


export default UserList;
