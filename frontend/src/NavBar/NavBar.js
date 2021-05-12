import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './NavBar.scss';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: sessionStorage.getItem('loggedIn')
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
            <div className="robin-navbar">
                <svg id="nav-logo" width="273" height="84" viewBox="0 0 273 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="robin">
                        <path d="M72 77.9H81.8V56.1C81.8 53.3 81.8 49.3 84.5 46.4C86.4 44.4 88.5 44.1 90.6 44.1C91.6 44.1 93.4 44.2 95.6 45.6L99.6 36.7C96.9 35.1 94.3 34.7 91.9 34.7C89.7 34.7 87.8 35 85.9 36.1C84.5 36.9 82.9 38.3 81.8 39.6V35.8H72V77.9Z" fill="#6153AE"/>
                        <path d="M123.55 34.7C110.85 34.7 101.05 43.9 101.05 56.9C101.05 69.8 110.85 79.2 123.55 79.2C136.25 79.2 146.05 69.8 146.05 56.9C146.05 43.9 136.25 34.7 123.55 34.7ZM123.55 70.4C115.85 70.4 111.05 65.1 111.05 57C111.05 47.4 117.35 43.5 123.55 43.5C129.75 43.5 136.05 47.4 136.05 57C136.05 65.1 131.25 70.4 123.55 70.4Z" fill="#6153AE"/>
                        <path d="M166.077 5H156.277V77.9H166.077V73.5C170.377 78.5 175.677 79.2 178.677 79.2C191.677 79.2 199.077 68.4 199.077 56.8C199.077 43.1 189.677 34.7 178.577 34.7C175.477 34.7 170.077 35.5 166.077 40.7V5ZM177.377 43.5C184.477 43.5 189.077 49.5 189.077 57C189.077 64.3 184.477 70.4 177.377 70.4C171.177 70.4 165.477 65.9 165.477 57.1C165.477 47.9 171.177 43.5 177.377 43.5Z" fill="#6153AE"/>
                        <path d="M209.305 35.8V77.9H219.105V35.8H209.305ZM207.905 18.4C207.905 22 210.605 24.7 214.205 24.7C217.805 24.7 220.505 22 220.505 18.4C220.505 14.8 217.805 12.1 214.205 12.1C210.605 12.1 207.905 14.8 207.905 18.4Z" fill="#6153AE"/>
                        <path d="M231.373 77.9H241.173V57.7C241.173 44.1 245.673 43.5 250.073 43.5C253.773 43.5 257.773 43.8 257.773 54.5V77.9H267.573V52.1C267.573 45.6 266.573 42.7 264.973 40.4C263.673 38.6 260.373 34.7 252.573 34.7C250.173 34.7 245.373 35 241.173 39.7V35.8H231.373V77.9Z" fill="#6153AE"/>
                        <g style={{mixBlendMode: "lighten"}}>
                            <circle cx="214.175" cy="18.425" r="6.425" fill="#73C1CE"/>
                        </g>
                    </g>
                    <g id="logo-hamburger" className="hamburger" onClick={(e) => this.handleOpen(e)}>
                        <rect x="5" y="36" width="52" height="42" fill="transparent"/> {/* add this so its easier to click menu */}
                        <path d="M54.1376 36H7.86239C6.28153 36 5 37.432 5 39.1984C5 40.9648 6.28153 42.3968 7.86239 42.3968H54.1376C55.7185 42.3968 57 40.9648 57 39.1984C57 37.432 55.7185 36 54.1376 36Z" fill="#6153AE"/>
                        <path d="M54.1376 47.8677H22.1743C20.5934 47.8677 19.3119 49.2997 19.3119 51.0661C19.3119 52.8326 20.5934 54.2645 22.1743 54.2645H54.1376C55.7184 54.2645 57 52.8326 57 51.0661C57 49.2997 55.7184 47.8677 54.1376 47.8677Z" fill="#6153AE"/>
                        <path d="M54.1376 59.7355H7.86239C6.28153 59.7355 5 61.1674 5 62.9339C5 64.7003 6.28153 66.1323 7.86239 66.1323H54.1376C55.7185 66.1323 57 64.7003 57 62.9339C57 61.1674 55.7185 59.7355 54.1376 59.7355Z" fill="#6153AE"/>
                        <path d="M54.1376 71.6032H22.1743C20.5934 71.6032 19.3119 73.0352 19.3119 74.8016C19.3119 76.568 20.5934 78 22.1743 78H54.1376C55.7184 78 57 76.568 57 74.8016C57 73.0352 55.7184 71.6032 54.1376 71.6032Z" fill="#6153AE"/>
                    </g>
                </svg>

                <Nav id="nav" className="robin-nav y-scrollable">
                    <Nav.Link className="robin-nav-close robin-nav-link" onClick={(e) => this.handleClose(e)} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </Nav.Link>
                    <Nav.Link className="robin-nav-link" as={Link} eventKey="home" to="/">home</Nav.Link>

                    {this.state.loggedIn === "true" && 
                    <>
                        <Nav.Link className="robin-nav-link" as={Link} eventKey="find_jobs" to="/search">find jobs</Nav.Link>
                        <Nav.Link className="robin-nav-link" as={Link} onClick={() => {sessionStorage.clear()}} eventKey="sign_out" to="/">sign out</Nav.Link>
                    </>
                    }

                    {this.state.loggedIn !== "true" && 
                    <>
                        <Nav.Link className="robin-nav-link" as={Link} eventKey="find_jobs" to="/signup">sign up</Nav.Link>
                        <Nav.Link className="robin-nav-link" as={Link} eventKey="find_jobs" to="/login">login</Nav.Link>
                    </>
                    }
                    <Nav.Link className="robin-nav-link" as={Link} eventKey="how_it_works" to="/how-it-works">how it works</Nav.Link>
                    <Nav.Link className="robin-nav-link" as={Link} eventKey="about_us" to="/about-us">about us</Nav.Link>
                </Nav>
            </div>
        );
    }
}