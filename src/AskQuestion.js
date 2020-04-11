import React, {Component} from 'react';
import {Link} from "@reach/router";

class AskQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ""
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit() {
        this.props.submit(this.state.title);
    }


    render() {
        return(
            <>
                <h2>Ask questions</h2>
                <input type="text" placeholder="Your question" name="title" onChange={event => this.onChange(event)}/>
                <br/>
                <Link to="/"><button onClick={_ => this.onSubmit()}>Add question</button></Link>
                <br/><br/>
                <Link to="/"> Go back</Link>

            </>
        );
    }
}

export default AskQuestion;