import React, {Component} from 'react';
import {Link} from "@reach/router";

class Questions extends Component {
    render() {
        const mapFunction = elm =>
            <li key={elm.id}>
                <Link to={"/question/"+elm.id}>{elm.title}</Link>
            </li>;

        let questions = this.props.data;
        let list = questions.map(mapFunction);

        return (
            <>
                <ul>
                    {list}
                </ul>
                <Link to="/Ask-a-question">Ask a question</Link>
            </>
        );
    }
}

export default Questions;