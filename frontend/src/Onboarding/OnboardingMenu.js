import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Onboarding.scss';

export default function OnboardingMenu(props) {
    const links = [
        {
            label: "Contact Information",
            link: "/general"
        },
        {
            label: "Education",
            link: "/education"
        },
        {
            label: "Experience",
            link: "/experience"
        },
        {
            label: "Skills",
            link: "/skills"
        },
        {
            label: "Projects",
            link: "/projects"
        }
    ];
    const location = useLocation();
    
    return (
        <Nav activeKey={location.pathname} className="onboarding-nav flex-column">
            {links.map((link, index) => {
                return (
                    <Nav.Link 
                        as={Link} 
                        to={props.url + "" + link.link}
                        eventKey={props.url + "" + link.link}
                        key={`onboarding-link-${index}`}
                        className={OnboardingPageFilled(index, props.progress)}
                        disabled={!props.progress.includes(index)}
                    >
                        <OnboardingNumber number={index+1}/>
                        {link.label}
                    </Nav.Link>
                )
            })}
        </Nav>
    );
}

function OnboardingNumber(props) {
    return (
        <div className="onboarding-nav-number mr-2">
            {props.number}
        </div>
    );
}

function OnboardingPageFilled(index, progress) {
    if (progress.includes(index))
        return "onboarding-nav-link filled";
    return "onboarding-nav-link";
}