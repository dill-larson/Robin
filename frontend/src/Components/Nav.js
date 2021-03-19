import React from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Page(props) {
    return (
        <>
            <ul>
                <Link to="/search" className="form-link"> Seach |</Link>
                <Link to="/login" className="form-link"> Login |</Link>
                <Link to="/signup" className="form-link"> Sign Up |</Link>
                <Link to="/onboarding/general" className="form-link"> Onboarding </Link>
            </ul>
        </>
    );
}