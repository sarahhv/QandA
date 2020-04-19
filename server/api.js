/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

/**** Configuration ****/
const appName = "Express API QandA"; // Change the name of your server app!
const port = process.env.PORT || 8080; // Pick port 8080 if the PORT env variable is empty.
const app = express(); // Get the express app object.

app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

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

(async _ => {
    //Connection to local database
    try {
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    } catch (e) {
        console.error(e);
    }
    console.log("Database connected:", mongoose.connection.name);

    const q1 = new Question({
        title: "What is pizza?",
        answers: [
            {text: "Pizza is love <3!", vote: 0}]
    });

    const q2 = new Question({
        title: "What is love?",
        answers: [
            {text:"It's like the song: Everything is Awesome!", vote: 0}]
    });

    //Save the Questions
    try {
        /*        let savedQ1 = await q1.save();
                let savedQ2 = await q2.save();
                console.log("Questions saved.", savedQ1, savedQ2);*/
    } catch (error) {
        console.error(error);
    }

    let question = await Question.findById("5e9af697de2c6134ac8670d7");
    console.log("Found a question:", question);

    await mongoose.disconnect(); // It's good practice to disconnect before closing the app.
    console.log("Databased disconnected");

})();

/**** Routes ****/
// API
app.get('/api/questions', async (req, res) => {
    const questions = await questionDB.getQuestions();
    res.json(questions);
});

// PostQuestion
app.post('/api/question', async (req, res) => {
    const createQuestionResult = await questionDB.createQuestion(reg.body.question);
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

/**** Start! ****/
const url = process.env.MONGO_URL || 'mongodb://localhost/qa1';

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        await app.listen(port); // Start the API
        console.log(`Question API running on port ${port}!`);
    })
    .catch(error => console.error(error));

// app.listen(port, () => console.log(`${appName} API running on port ${port}!`));
