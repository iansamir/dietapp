const path = require('path');
const express = require('express');
const port = process.env.PORT || 5001;
const { generateText } = require('./openAIResponse')

const app = express();

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect("/diet");
});

app.get('/diet', (req, res) => {
    res.sendFile(__dirname + "/public/diet.html");
});

app.post('/openAI', generateText);

app.listen(port, () => console.log(`Server started on port ${port}`));