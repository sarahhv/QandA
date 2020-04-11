import React, {Component} from 'react';
import {Link, Router} from "@reach/router";
import PostAnswer from "./PostAnswer";

class Question extends Component {
    constructor(props) {
        super(props);

        const question = this.props.getQuestion(this.props.id);

        this.state = {
            question: question,
            title: question.title,
            answers: question.answers
        }
    }

    addAnswer(answer) {
        this.setState({question: {...this.state.question, answers: [...this.state.answers, answer]}},
            function() {
                console.log("Vi leger det virker.....");
                this.props.updateQuestion(this.state.question);
            });
    }

    render() {
        const mapFunction = (answer, index) =>
            <li key={index}>
                {answer}
            </li>;
        let answersList = this.state.answers.map(mapFunction);

        return (
            <>
                <h2>{this.state.title}</h2>
                <h3>Answers:</h3>
                <ul>
                    {this.state.question.answers}
                </ul>
                <PostAnswer path="/" submit={(answer) => this.addAnswer(answer)}></PostAnswer>
                <br/><br/>


                <Link to="/">Back to questions</Link>
            </>
        );
    }
}

export default Question;