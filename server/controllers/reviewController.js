const db = require('../database/model.js');
const reviewController = {};


reviewController.getReviews = async (req, res, next) => {
  // req.query will determine which filter will be used (produce, email)
  let filter = '';
  let value = '';
  if(req.query.produce) {
    filter = 'produce';
    value = req.query.produce;
  }
  else{
    filter = 'email';
    value = req.query.email;
  }

  // obtain all filtered reviews to send back to the client
  const sqlCommand = `
    SELECT * FROM Reviews
    WHERE ${filter} = $1;
  `;
  const values = [ value ];
  await db.query(sqlCommand, values, (err, result) => {
    if(err) return next('Error in reviewController.getReviews: getting all reviews for the produce from Reviews table in the database');
    res.locals.reviews = result.rows;
    return next();
  });
}

reviewController.updateReview = async (req, res, next) => {
  // req.params.is will provide the review id which will allow us to update specific reviews
  const reviewId = req.params.id;
  const { description } = req.body;

  // update the description of a review specified by the review id
  const sqlCommand = `
    UPDATE Reviews
    SET description = $2
    WHERE review_id = $1
    RETURNING *;
  `;
  const values = [ reviewId, description ];

  await db.query(sqlCommand, values, (err, result) => {
    if(err) return next('Error in reviewController.updateReview: updating user\'s review to Reviews table in the database');
    res.locals.review = result.rows[0];
    return next();
  });

};

reviewController.deleteReview = async (req, res, next) => {
   // req.params.is will provide the review id which will allow us to update specific reviews
  const reviewId = req.params.id;

  // delete the review specified by the review id
  const sqlCommand = `
    DELETE FROM Reviews
    WHERE review_id = $1;
  `;
  const values = [ reviewId ];
  await db.query(sqlCommand, values, (err, result) => {
    if(err) return next('Error in reviewController.deleteReview: deleting user\'s review to Reviews table in the database');
    res.locals.confirmDelete = 'Review deleted';
    return next();
  });
};

reviewController.createReview = async (req, res, next) => {
  // assumes that user email, produce will be passed in from req.body
  const { email, produce, farm, description } = req.body;

  // add a new review to the database
  const sqlCommand = `
    INSERT INTO Reviews (email, produce, farm, description)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [email, produce, farm, description];

  await db.query(sqlCommand, values, (err, result) => {
    if(err) return next('Error in reviewController.createReview: writing user\'s review to Reviews table in the database');
    res.locals.review = result.rows[0];
    console.log(result);
    return next();
  });

};

module.exports = reviewController;
