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

// route to sign in page
app.get('/sign-in', (req, res) => {
  res.status(200).send('reached the sign in page');
})

// route to signup page
app.get('/sign-up', (req, res) => {
  res.status(200).send('reached the sign up page');
})

// route to 'add review' page
app.get('/add-reviews', (req, res) => {
  res.status(200).send('reached the add reviews page');
})

// route to 'edit review' page
app.get('/edit-reviews', (req, res) => {
  res.status(200).send('reach the edit reviews page');
})

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
