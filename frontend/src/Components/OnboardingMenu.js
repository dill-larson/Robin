import React from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function General(){
    return(<div className="onboarding-menu">
        <Link to="/onboarding" className="onboarding-menu-current "> Contact Information</Link>
        <p to="/" className="onboarding-menu-element"> Education</p>
        <p to="/" className="onboarding-menu-element"> Experience</p>
        <p to="/" className="onboarding-menu-element"> Skills</p>
        <p to="/" className="onboarding-menu-element"> Projects</p>
    </div >);
}
function Education(){
    return(<div className="onboarding-menu">
        <Link to="/onboarding" className="onboarding-menu-filled"> Contact Information</Link>
        <Link to="/" className="onboarding-menu-current"> Education</Link>
        <p to="/" className="onboarding-menu-element"> Experience</p>
        <p to="/" className="onboarding-menu-element"> Skills</p>
        <p to="/" className="onboarding-menu-element"> Projects</p>
    </div >);
}
function Experience(){
    return(<div className="onboarding-menu">
        <Link to="/onboarding" className="onboarding-menu-filled"> Contact Information</Link>
        <Link to="/onboarding" className="onboarding-menu-filled">Education</Link>
        <Link to="/" className="onboarding-menu-current"> Experience</Link>
        <p to="/" className="onboarding-menu-element"> Skills</p>
        <p to="/" className="onboarding-menu-element"> Projects</p>
    </div >);
}
function Skills(){
    return(<div className="onboarding-menu">
        <Link to="/onboarding" className="onboarding-menu-filled"> Contact Information</Link>
        <Link to="/onboarding" className="onboarding-menu-filled"> Education</Link>
        <Link to="/onboarding" className="onboarding-menu-filled">Experience</Link>
        <Link to="/" className="onboarding-menu-current"> Skills</Link>
        <p to="/" className="onboarding-menu-element"> Projects</p>
    </div >);
}
function Projects(){
    return(<div className="onboarding-menu">
        <Link to="/onboarding" className="onboarding-menu-filled"> Contact Information</Link>
        <Link to="/onboarding" className="onboarding-menu-filled">Education</Link>
        <Link to="/onboarding" className="onboarding-menu-filled">Experience</Link>
        <Link to="/onboarding" className="onboarding-menu-filled"> Skills</Link>
        <Link to="/" className="onboarding-menu-current">  Projects</Link>
    </div >);
}


export default function Page(props) {
    if(props.current == "general"){
        return(<General></General>);
    }else if(props.current == "education"){
        return(<Education></Education>);
    }else if(props.current == "experience"){
        return(<Experience></Experience>);
    }else if(props.current == "skills"){
        return(<Skills></Skills>);
    }else if(props.current == "projects"){
        return(<Projects></Projects>);
    }
    
}
