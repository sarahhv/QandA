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
        const url = 'mongodb://localhost/qa1';
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    } catch (e) {
        console.error(e);
    }
    console.log("Database connected:", mongoose.connection.name);

    const questionSchema = new mongoose.Schema({
        title: String,
        answers: [{
            text: String,
            vote: Number
        }]
    });

    const Question = mongoose.model('Question', questionSchema);

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
app.get('/api/questions', (req, res) => {
    (async _ => {
        //Connection to local database
        try {
            const url = 'mongodb://localhost/qa1';
            await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
        } catch (e) {
            console.error(e);
        }

        const Question = mongoose.model('Question');

        let questions = await Question.find()
        res.json(questions);

        await mongoose.disconnect(); // It's good practice to disconnect before closing the app.
        console.log("Databased disconnected");
    })();
});

// PostAnswer
app.post('/api/question/:id/answers', (req, res) => {
    (async _ => {
        //Connection to local database
        try {
            const url = 'mongodb://localhost/qa1';
            await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
        } catch (e) {
            console.error(e);
        }

        const Question = mongoose.model('Question');

        const qId = req.params.id;
        const answer = req.body.answer;
        const question = await Question.findById(qId);
        question.answers.push(answer);
        console.log(question);
        res.json({msg: "Answer added", question: question});

        try {
            let aSaved = await question.save();
            console.log("Answer added.", aSaved);
        } catch(error) {
            console.error(error);
        }

        await mongoose.disconnect(); // It's good practice to disconnect before closing the app.
        console.log("Databased disconnected");
    })();
});

// PostQuestion
app.post('/api/question', (req, res) => {
    (async _ => {
        //Connection to local database
        try {
            const url = 'mongodb://localhost/qa1';
            await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
        } catch (e) {
            console.error(e);
        }

        const Question = mongoose.model('Question');

        const question = new Question(req.body.question);
        console.log(question);
        res.json({msg: "Question added", question: question});

        try {
            let qSaved = await question.save();
            console.log("Question added.", qSaved);
        } catch(error) {
            console.error(error);
        }

        await mongoose.disconnect(); // It's good practice to disconnect before closing the app.
        console.log("Databased disconnected");
    })();
});

// Vote Update -- put
app.put('/api/question/:qId/answers/:aId', (req, res) => {
    (async _ => {
        //Connection to local database
        try {
            const url = 'mongodb://localhost/qa1';
            await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
        } catch (e) {
            console.error(e);
        }

        const Question = mongoose.model('Question');

        const aId = req.params.aId;
        const qId = req.params.qId;
        const vote = req.body.vote;
        const question = await Question.findById(qId);
        console.log(question);
        const answer = await question.answers.find(a => a.id === aId);
        answer.vote = vote;
        console.log(answer, vote);
        res.json({msg: "Vote changed", answer: answer});

        try {
            let vSaved = await question.save();
            console.log("Answer updated.", vSaved);
        } catch(error) {
            console.error(error);
        }

        await mongoose.disconnect(); // It's good practice to disconnect before closing the app.
        console.log("Databased disconnected");
    })();
})

/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));
