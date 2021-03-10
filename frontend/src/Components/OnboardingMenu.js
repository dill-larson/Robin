import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Onboarding.scss';

export default function OnboardingMenu() {
    const location = useLocation();
    const [progress] = useState([0,1]);
    const links = [
        {
            label: "Contact Information",
            link: "/onboarding-general"
        },
        {
            label: "Education",
            link: "/onboarding-education-1"
        },
        {
            label: "Experience",
            link: "/onboarding-experience-1"
        },
        {
            label: "Skills",
            link: "/onboarding-skills"
        },
        {
            label: "Projects",
            link: "/onboarding-projects-1"
        }
    ];

    return (
        <Nav activeKey={location.pathname} className="onboarding-nav flex-column">
            {links.map((link, index) => {
                return (
                    <Nav.Link 
                        as={Link} 
                        to={link.link}
                        eventKey={link.link}
                        key={`onboarding-link-${index}`}
                        className={OnboardingPageFilled(index, progress)}
                        disabled={!progress.includes(index)}
                    >
                        <OnboardingNumber number={index+1}/>
                        {link.label}
                    </Nav.Link>
                )
            })}
        </Nav>
    );
}

function OnboardingPageFilled(index, progress) {
    if (progress.includes(index))
        return "onboarding-nav-link filled";
    return "onboarding-nav-link";
}

function OnboardingNumber(props) {
    return (
        <div className="onboarding-nav-number mr-2">
            {props.number}
        </div>
    );
}