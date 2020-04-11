import React, {Component} from 'react';
import {Router} from "@reach/router";
import Questions from "./Questions";
import Question from "./Question";
import AskQuestion from "./AskQuestion";
import { objectExpression } from '@babel/types';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [
                {id: 0, title: "What is pizza?", answers: ["Pizza is love <3!"]},
                {id: 1, title: "What is love?", answers: ["It's like the song: Everything is Awesome!"]}
            ]
        }
    }
/*Routes*/
    // Return all recipes in data
/*    app.get('/api/questions', (req, res) => res.json(question));

    //PostAnswer
    app.post('/api/questions/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const text = req.body.text;
        const question = question.find(q => q.id === id);
        question.answers.push(text);
        console.log(question);

        res.json({msg: "Answer added", question: question});
});*/

/*Start!*/
    /*app.listen(port, ()=>console.log(`${appName} API running on port ${port}!`));
*/
    addQuestion(title) {
        const newQuestion = {
            id: Math.floor(Math.random()*1000000),
            title: title,
        };
        this.setState({
            questions: [...this.state.questions, newQuestion]
        });
        // console.log(newQuestion);
    }

    getQuestion(id) {
        const findFunction = question => question.id === parseInt(id);
        return this.state.questions.find(findFunction);
    }

    updateQuestion(id, newAnswer) {
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
    }

    render() {
    return(
        <>
            <h1>Question and answers app</h1>
            <Router>
                <Questions path="/" data={this.state.questions}></Questions>
                <Question path="/question/:id" getQuestion={(id) => this.getQuestion(id)} updateQuestion={this.updateQuestion.bind(this)}></Question>
                <AskQuestion path="/Ask-a-question" submit={(title) => this.addQuestion(title)}></AskQuestion>
            </Router>
            <div>
            </div>
        </>
    );
  }
}

export default App;