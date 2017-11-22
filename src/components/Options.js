import React from 'react';

import Option from './Option';

const Options = (props) => (
    <div>            
        {props.options.length === 0 ? <p>No choices yet, add one now!</p> : <p>Here are your options</p>}
        {
            props.options.map((option) => (
                <Option 
                    key={option} 
                    optionText={option} 
                    handleDeleteOption={props.handleDeleteOption}
                />
            ))
        }
        {props.options.length > 0 && <button onClick={props.handleDeleteOptions}>Remove All</button>}
    </div>
);

export default Options;