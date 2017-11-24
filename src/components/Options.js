import React from 'react';

import Option from './Option';

const Options = (props) => (
    <div>  
        <div className="widget-header">
            <h3 className="widget-header__title">{props.options.length > 0 ? "Your options" : "No options yet"}</h3>
            <button
                className="button button--link"
                onClick={props.handleDeleteOptions}
            >
            Delete all
            </button>
        </div>        
        { props.options.length === 0 && <p className="widget__message">Add an option to get started!</p> }
        {
            props.options.map((option, index) => (
                <Option 
                    key={option} 
                    optionText={option}
                    count={index + 1}
                    handleDeleteOption={props.handleDeleteOption}
                />
            ))
        }
    </div>
);

export default Options;