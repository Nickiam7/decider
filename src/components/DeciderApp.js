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
            return "You've arleady entered that one!";
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
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />               
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    closeOptionModal={this.closeOptionModal}
                />
            </div>
        );
    }
}