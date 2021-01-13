import React,{useState} from 'react';
import {Form, Row,Col, Button} from 'react-bootstrap';
import {useSelector} from 'react-redux';

function StartDialog({isShow, password, boardID}) {

    const [input, setInput] = useState("");
    const socket = useSelector(state => state.socket.socket);
    const comparePassword = ()=>{
        if (input === password)
        {
            console.log(password);
            socket.emit("start-game", {boardID});
        }
    }
    return (
        <>
        {isShow?
        <div className="password-dialog">
            <Form className="password-form">
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column md="2">
                    Password
                    </Form.Label>
                    <Col md="8">
                        <Form.Control type="password" placeholder="Password"
                        value={input}
                        onChange={(e) => setInput(e.target.value)} />
                    </Col>
                    <Col md='2'>
                        <Button variant="info"
                        onClick={comparePassword}>Submit</Button>
                    </Col>
             </Form.Group>
            </Form>
        </div>
        :null}
        </>
    )
}

export default StartDialog;
