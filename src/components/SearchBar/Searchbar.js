import React from 'react';
import {Form, Button, FormControl} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,faPlus } from "@fortawesome/free-solid-svg-icons";

function Searchbar() {

    return (
        <Form inline>
        <FormControl type="text" placeholder="Find board by board ID...." className="search-bar"/>
        <Button variant="info" className="search-btn">
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            <span> Join Board</span>
        </Button>
        <Button variant="warning" className="search-btn">
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            <span> Play</span>
        </Button>
        </Form>
    )
}

export default Searchbar;
