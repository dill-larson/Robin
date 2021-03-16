import React from 'react';
import { Row, Button,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Field(props){
    return( <Row className= "information-field" style={{justifyContent:"flex-end"}}>
        <Col style={{marginTop:"1.5rem"}}>
        <h3 >{props.name}</h3>
        <p>{props.description}</p>
        </Col>
        <Button type="submit" style={{height:"2.3rem", marginTop:"3rem",marginBottom:"3rem",marginRight:"1rem", backgroundColor:"grey", borderColor:"grey"}}>Edit</Button>
</Row>);
}
export default function InformationFields(props) {
    return( 
    <div className= "information-field-back">
       <Field name={props.name} description={props.description}></Field>
       <Row  style={{justifyContent:"flex-end", width:"45rem"}}>
        <Button type="submit" style={{height:"2.3rem", backgroundColor:"grey", borderColor:"grey"}}>Add</Button>
       </Row>
    </div>);
   
    
}
