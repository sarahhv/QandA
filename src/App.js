import React, {Component} from 'react';
import {Router} from "@reach/router";
import Questions from "./Questions";
import Question from "./Question";
import AskQuestion from "./AskQuestion";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [
            ]
        }
    }

    componentDidMount() {
        this.getData();
    }

    //Fetch data from the API and putting it in the state
    async getData() {
        const url = "http://localhost:8080/api/questions";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            questions: data
        })
    }

    addQuestion(title) {
        const newQuestion = {
                title: title,
                answers: []
        };
        this.postQuestion(newQuestion);

//Used this before API
/*        this.setState({
            questions: [...this.state.questions, newQuestion]
        });
        // console.log(newQuestion);*/
    }

    getQuestion(id) {
        const findFunction = question => question._id === id;
        return this.state.questions.find(findFunction);
    }

    async postAnswer(id, answer) {
        console.log("postAnswer", id, answer);
        const url = `http://localhost:8080/api/question/${id}/answers`;

        const response = await fetch(url, {
            headers: {
                'Content-type' : 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                answer: answer
            })
        });
        const data = await response.json();
        console.log("Printing the response", data);
        this.getData();
    }

    async postQuestion(question) {
        console.log("postQuestion", question);
        const url = `http://localhost:8080/api/question`;

        const response = await fetch(url, {
            headers: {
                'Content-type' : 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                question: question
            })
        });
        const data = await response.json();
        console.log("Printing the response", data);
        this.getData();
    }

    async putVote (qId, answer, vote) {
        console.log("PutVote", answer, vote);
        const aId = answer._id;
        const url = `http://localhost:8080/api/question/${qId}/answers/${aId}`;

        const response = await fetch(url, {
            headers: {
                'Content-type' : 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                vote: vote
            })
        });
        const data = await response.json();
        console.log("Putting the response", data);
        this.getData();
    }

//Used this before i had an API
/*    updateQuestion(id, newAnswer) {
        var questionsArr = this.state.questions.filter(q => {
            return q.id !== id;
        });

        var question = this.state.questions.find(q => {
            return q.id === id;
        });

        question.answers = [...question.answers, newAnswer];

        questionsArr = [...questionsArr, question];

        this.setState({
            questions: questionsArr
        });
    }*/

    render() {
    return(
        <>
            <h1>Question and answers app</h1>
            <Router>
                <Questions path="/" data={this.state.questions}></Questions>
                <Question path="/question/:id"
                          getQuestion={(id) => this.getQuestion(id)}
                          postAnswer={(id, text) => this.postAnswer(id, text)}
                          putVote={(qId, answer, vote) => this.putVote(qId, answer, vote)}
                >
                </Question>
                <AskQuestion path="/Ask-a-question" submit={(title) => this.addQuestion(title)}></AskQuestion>
            </Router>
            <div>
            </div>
        </>
    );
  }
}

export default App;
