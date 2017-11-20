class DecisonerApp extends React.Component {
    constructor(props) {
        super(props);

        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);

        this.state = {
            options: []
        };
    }

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

    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    }

    handlePick() {
        const rand = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[rand];
        alert(option);
    }

    handleAddOption(option) {
        if(!option) {
            return 'Please enter a new option!';
        } else if(this.state.options.indexOf(option) > -1) {
            return "You've arleady entered that one!";
        } 
        this.setState((prevState) => ({options: prevState.options.concat(option)}));
    }

    render() {                         
        const subtitle = "Never think again!";
        return (
            <div>
                <Header subtitle={"Never thing again!"}/>
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
            </div>
        );
    }
}

const Header = (props) => {
    return(
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && (
                <h2>{props.subtitle}</h2>
            )}
        </div>
    );
};
Header.defaultProps = {
    title: "DecisonerApp"
};

const Action = (props) => {
    return (
        <div>                
            <button 
                onClick={props.handlePick}
                disabled={!props.hasOptions}>
                What shoud I do                    
            </button>                
        </div>
    );    
};

const Options = (props) => {
    return (
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
}; 

const Option = (props) => {    
    return (
        <div>
            <p>
               {props.optionText} 
                <button 
                    onClick={(e) => {
                        props.handleDeleteOption(props.optionText);
                    }}>
                     Delete
                </button>
            </p>
        </div>
    );    
};

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({ error }));         

        if(!error) {
            e.target.elements.option.value = "";
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<DecisonerApp />, document.getElementById('app'));