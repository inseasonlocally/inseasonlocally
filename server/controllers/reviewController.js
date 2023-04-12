const db = require('../database/model.js');
const reviewController = {};


reviewController.getReviews = async (req, res, next) => {
  // assumes that email will be passed in from URL params
  console.log(req.query);
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
  // assumes that data will be passed in from req.body
  const reviewId = req.params.id;
  const { description } = req.body;

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
  // assumes that data will be passed in from URL params
  const reviewId = req.params.id;
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
