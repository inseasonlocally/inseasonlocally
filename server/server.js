const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use('/build', express.static(path.resolve(__dirname,'../build')));

app.get('/', (req, res, next) => {console.log('root middleware reached'); return next();}, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname,'../client/index.html'));
});

// retrieve pictures of in-season produce based on location & date
app.get('/landing', (req, res) => {
  res.status(200).send('reached the landing page');
})

// retrieve reviews of the selected produce

// retrieve reviews of the current user

// create a new review and write to database
app.post('/add-reviews:email', (req, res) => {
  res.status(200).send('reached the add reviews page');
})

// edit an existing review in the database
app.patch('/edit-reviews:email', (req, res) => {
  res.status(200).send('reach the edit reviews page');
})

// delete an existing review in the database


// catch-all route handler for any requests to an unknown route
app.use((req, res) => {
  res.sendStatus(404);
});

// global express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign(defaultErr, err);

  console.log(`Error log: ${errorObj.log}`);

  res.status(errorObj.status).send({message: errorObj.message});
});

// start server
app.listen(PORT);

module.exports = app;
