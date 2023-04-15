const path = require('path');
const express = require('express');
// const { user } = require('pg/lib/defaults.js');
const userController = require('./controllers/userController.js');
const reviewController = require('./controllers/reviewController.js');
const produceController = require('./controllers/produceController.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res, next) => { console.log('root middleware reached'); return next(); }, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.post('/api/sign-in', userController.verifyUser, (req, res) => {
  res.status(200).json({
    signIn: res.locals.signIn,
    email: res.locals.email,
    location: res.locals.location
  });
});

app.post('/api/sign-up', userController.createUser, (req, res) => {
  res.status(200).json({
    signIn: res.locals.createdUser,
    email: res.locals.email,
    location: res.locals.location
  });
});

// changes the location where we're searching for produce
app.patch('/api/location', userController.changeLocation, (req, res) => {
  res.status(200).json({
    signIn: res.locals.changed,
    email: res.locals.email,
    location: res.locals.location
  });
});

// retrieve pictures of in-season produce based on location & date
app.get('/api/produce/:location', produceController.getAllProduce, (req, res) => {
  res.status(200).json(res.locals.produce);
});

// retrieve reviews of the selected produce/user
app.get('/api/reviews', reviewController.getReviews, (req, res) => {
  res.status(200).json(res.locals.reviews);
});

// create a new review and write to database
app.post('/api/reviews', reviewController.createReview, (req, res) => {
  res.status(200).json(res.locals.review);
});

// edit an existing review in the database
app.patch('/api/reviews/:id', reviewController.updateReview, (req, res) => {
  res.status(200).json(res.locals.review);
});

// delete an existing review in the database
app.delete('/api/reviews/:id', reviewController.deleteReview, (req, res) => {
  res.status(200).json(res.locals.review);
});

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

  res.status(errorObj.status).send({ message: errorObj.message });
});

// start server
app.listen(PORT);

module.exports = app;
