import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostAnswer from "./PostAnswer";

class Question extends Component {
    upVote(aId, question) {
        let answer = question.answers.find(a => a._id === aId);
        let vote = answer.vote + 1;
        console.log(aId, "Downvoted", answer, vote);
        this.props.putVote(question._id, answer, vote)
    }

    downVote(aId, question) {
        let answer = question.answers.find(a => a._id === aId);
        let vote = answer.vote - 1;
        console.log(aId, "Downvoted", answer, vote);
        this.props.putVote(question._id, answer, vote)
    }

    addAnswer(text, question) {
        const newAnswer = {
            text: text,
            vote: 0
        };
        this.props.postAnswer(question._id, newAnswer);
    }


    render() {
        const question = this.props.getQuestion(this.props.id);
/*        const mapFunction = (answer, index) =>
            <li key={index}>
                {answer.text}
                <button onClick={() => this.upVote(answer._id, question)} style={{marginLeft: "2vw"}}>Up</button>
                <span style={{margin: "0 2vw"}}>{answer.vote}</span>
                <button onClick={() => this.downVote(answer._id, question)}>Down</button>
            </li>;
        let answersList = question.answers.map(mapFunction);*/
        let content = <p>Loading.... </p>;

        if(question) {
            content = (
                <>
                    <h2>{question.title}</h2>
                    <h3>Answers:</h3>
                    <ul>
                        {question.answers.map(a, index => (
                            <li key={index}>
                                {a.text}
                                <button onClick={() => this.upVote(a._id, question)} style={{marginLeft: "2vw"}}>Up</button>
                                <span style={{margin: "0 2vw"}}>{a.vote}</span>
                                <button onClick={() => this.downVote(a._id, question)}>Down</button>
                            </li>
                        ))}
                    </ul>
                    <PostAnswer path="/" submit={(answer) => this.addAnswer(answer, question)}></PostAnswer>
                    <br/><br/>


                    <Link to="/">Back to questions</Link>
                </>
            )
        }

        return content;
{/*        <>
            <h2>{question.title}</h2>
            <h3>Answers:</h3>
            <ul>
                {answersList}
            </ul>
            <PostAnswer path="/" submit={(answer) => this.addAnswer(answer, question)}></PostAnswer>
            <br/><br/>


            <Link to="/">Back to questions</Link>
        </>*/}
    }
}

export default Question;