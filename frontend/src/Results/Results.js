import React from 'react';
import './Results.scss';
import axios from 'axios';

import JobCardResult from "./JobCardResult"
import Loading from "./Loading"
import Page from '../Page/Page';
import NavBar from '../NavBar/NavBar';

export default class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.match.params.url.replaceAll('%2F', '/'),
            jobs: [],
            informationPosted: false
        };
    }

    componentDidMount() {
        const params = {
            email: sessionStorage.getItem('email'),
            url: this.state.url
        };

        axios.get(`http://127.0.0.1:5000/scrape`, { params })
            .then(res => {
                console.log(res.data[0]);
                const jobs = res.data;
                this.setState({ jobs });
            });
    }
    
    render() {
        return !this.state.jobs.length ?
        <Loading /> :
        ( 
            <Page>
                <NavBar/>
                <div className="results-header">
                    <h1 className="header-title"> Job Search Results</h1>
                </div>
                <div className="results-container">
                {this.state.jobs.map(job => {
                        return (
                        <JobCardResult 
                            company={job.company}
                            position={job.Title}
                            city={job.location}
                            description={job.Description}
                            score={job.score}
                        />
                        );
                    })}
                </div>
            </Page>
        );
     }
}