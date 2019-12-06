import express from 'express';

const app = express();
const port = 3200;

app.get('/', (request, result) => {
    result.send('I am here');
});

app.listen(port, error => {
    if (error) {
        return console.error(error);
    }
    return console.log(`Server is listening on ${port}`);
})
