import React from 'react';

const Scroll = (props) => {
    return (
      <div style={{overflowY: 'scroll', height: 'auto', maxHeight: '200px'}}>
          {props.children}
      </div>  
    );
};

export default Scroll;