import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Logo from "../illustrations/Logo";
import './NavBar.scss';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true
        }
    }

    handleOpen(e) {
        e.preventDefault();
        document.getElementById('nav').style.width = "18rem";
    }

    handleClose(e) {
        e.preventDefault();
        document.getElementById('nav').style.width = "0";
    }

    render() {
        return(
            <div>
                <a id="nav-logo" className="nav-logo" onClick={(e) => this.handleOpen(e)}>
                    <Logo  size="15rem"/>
                </a>
                
                <Nav id="nav" className="nav flex-column">
                    <Nav.Link className="nav-close" onClick={(e) => this.handleClose(e)} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </Nav.Link>
                    <Nav.Link as={Link} eventKey="home" to="/">home</Nav.Link>
                    {/* <Nav.Link as={Link} eventKey="login" to="/login">login</Nav.Link>
                    <Nav.Link as={Link} eventKey="sign_up" to="/signup">sign up</Nav.Link> */}
                    <Nav.Link eventKey="profile">profile</Nav.Link>
                    <Nav.Link eventKey="find_jobs">find jobs</Nav.Link>
                    <Nav.Link eventKey="portfolio">jobs, skills, projects</Nav.Link>
                </Nav>
            </div>
        );
    }
}