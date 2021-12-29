import express from 'express';

const app = express();

const PORT = 8081;

app.listen(PORT, () => {

    console.log('Server listen on port', PORT);
})