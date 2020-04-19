/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');


/**** Configuration ****/
const appName = "Express API QandA"; // Change the name of your server app!
const port = process.env.PORT || 8080; // Pick port 8080 if the PORT env variable is empty.
const app = express(); // Get the express app object.

app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use(express.static('../client/build')); // Needed for serving production build of React

/**** Database ****/
const questionDB = require('./question_db')(mongoose);

//Data array
/*const questions = [
    {id: 0, title: "What is pizza?", answers: [
        {id: 0, text: "Pizza is love <3!", vote: 0}]
    },
    {id: 1, title: "What is love?", answers: [
        {id: 0, text:"It's like the song: Everything is Awesome!", vote: 0}]
    }
];*/

/**** Routes ****/
// API
app.get('/api/questions', async (req, res) => {
    const questions = await questionDB.getQuestions();
    res.json(questions);
});

// PostQuestion
app.post('/api/question', async (req, res) => {
    const createQuestionResult = await questionDB.createQuestion(req.body.question);
    res.json({msg: "Question added", question: createQuestionResult});
});

// PostAnswer
app.post('/api/question/:id/answers', async (req, res) => {
    const qId = req.params.id;
    const answer = req.body.answer;
    const addAnswerResult = await questionDB.addAnswer(qId, answer);
    res.json({msg: "Answer added", question: addAnswerResult});
});

// Vote Update -- put
app.put('/api/question/:qId/answers/:aId', async (req, res) => {
        const aId = req.params.aId;
        const qId = req.params.qId;
        const vote = req.body.vote;
        const updateVoteResult = await questionDB.updateVote(qId, aId, vote);
        res.json({msg: "Vote changed", answer: updateVoteResult});
})

// "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html) to be handled by Reach router
// It's important to specify this route as the very last one to prevent overriding all of the other routes
app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

/**** Start! ****/
const url = process.env.MONGO_URL || 'mongodb://localhost/qa1';

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        await app.listen(port); // Start the API
        console.log(`Question API running on port ${port}!`);
    })
    .catch(error => console.error(error));

// app.listen(port, () => console.log(`${appName} API running on port ${port}!`));
