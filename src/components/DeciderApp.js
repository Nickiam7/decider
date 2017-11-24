import React from 'react';

import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

export default class DeciderApp extends React.Component {

    state = {
        options: [],
        selectedOption: undefined
    };

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    };

    handlePick = () => {
        const rand = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[rand];
        this.setState(() => ({
            selectedOption: option
        }));
    };

    handleAddOption = (option) => {        
        if(!option) {
            return 'Please enter a new option!';
        } else if(this.state.options.indexOf(option) > -1) {
            return `You already entered ${option}`;
        } 
        this.setState((prevState) => ({options: prevState.options.concat(option)}));
    };

    closeOptionModal = () => {
        this.setState(() => ({ selectedOption: undefined }));
    };

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options) {
                this.setState(() => ({options: options}));
            }
        } catch(e) {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    render() {                         
        const subtitle = "Never think again!";
        return(
            <div>
                <Header subtitle={"Never think again!"}/>
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options 
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption 
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                    <div className="disclaimer">
                        <p className="disclaimer__title">Legal Disclaimer</p>
                        <p className="disclaimer__body">All decisions made by DeciderApp are legally binding and must be honored under law. 
                        If you decide not to honor DeciderApp's decision, DeciderApp will look for you and DeciderApp will find you.</p>
                    </div>               
                    <OptionModal 
                        selectedOption={this.state.selectedOption}
                        closeOptionModal={this.closeOptionModal}
                    />
                </div>
            </div>
        );
    }
}