/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

/**** Configuration ****/
const appName = "Express API QandA"; // Change the name of your server app!
const port = process.env.PORT || 8080; // Pick port 8080 if the PORT env variable is empty.
const app = express(); // Get the express app object.

app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

const questions = [
    {id: 0, title: "What is pizza?", answers: ["Pizza is love <3!"]},
    {id: 1, title: "What is love?", answers: ["It's like the song: Everything is Awesome!"]}
];

/**** Routes ****/
// API
app.get('/api/questions', (req, res) => {
    res.json(questions);
});

// PostAnswer
app.post('/api/questions/:id/answers', (req, res) => {
    const id = parseInt(req.params.id);
    const text = req.body.text;
    const question = questions.find(q => q.id === id);
    question.answers.push(text);
    console.log(question);
    res.json({msg: "Answer added", question: question});
});

// PostQuestion
app.post('/api/question', (req, res) => {
   const question = req.body.question;
   questions.push(question);
   console.log(question);
   res.json({msg: "Question added", question: question});
});

/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));