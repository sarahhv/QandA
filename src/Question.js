import React, {Component} from 'react';
import {Link, Router} from "@reach/router";
import PostAnswer from "./PostAnswer";

class Question extends Component {
    addAnswer(answer, question) {
        this.props.updateQuestion(question.id, answer);
    }

    render() {
        const question = this.props.getQuestion(this.props.id);
        const mapFunction = (answer, index) =>
            <li key={index}>
                {answer}
            </li>;
        let answersList = question.answers.map(mapFunction);

        return (
            <>
                <h2>{question.title}</h2>
                <h3>Answers:</h3>
                <ul>
                    {answersList}
                </ul>
                <PostAnswer path="/" submit={(answer) => this.addAnswer(answer, question)}></PostAnswer>
                <br/><br/>


                <Link to="/">Back to questions</Link>
            </>
        );
    }
}

export default Question;