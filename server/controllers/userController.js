const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt.js');
const db = require('../database/model.js');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { email, password, location } = req.body;
  if(!email || !password || !location) return next('Error in userController.createUser: not given all necessary inputs');

  // finding if user already exists
  const sqlCommand1 = `
    SELECT * FROM Accounts WHERE email = $1;
  `;
  const values1 = [ email ];
  await db.query(sqlCommand1, values1, (err, result) => {
    if(err) return next('Error in userController.createUser: finding if user already exists');
    if(result.rows[0].email) res.redirect('/sign-in');
  });

  // if user does not already exist, create user
  const sqlCommand2 = `
    INSERT INTO Accounts (email, password, state)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  // hashing password before saving user information to the database
  await bcrypt.hash(password, SALT_WORK_FACTOR, function(err, hash) {
    if(err) return next(err);
    password = hash;
  });

  // saving information to the database
  const values2 = [ email, password, location ];
  await db.query(sqlCommand2, values2, (err, result) => {
    if(err) return next('Error in userController.createUser: adding a new user to Accounts table in the database');
    const { email, state } = result.rows[0];
    res.local.user = email;
    res.local.location = state;
  });
  return next();
};

userController.verifyUser = async (req, res, next) => {
  const { email, password } = req.body;
  if(!email || !password) return next('Error in userController.verifyUser: not given all necessary inputs');
  const sqlCommand = `
    SELECT * FROM Accounts WHERE email = $1;
  `;
  const values = [ email ];
  await db.query(sqlCommand, values, async (err, result) => {
    if(err) return next('Error in userController.verifyUser: finding the user in the Accounts table of the database');
    if(!result.rows[0].email) res.redirect('/sign-in');
    await bcrypt.compare(password, result.rows[0].password, (err, matched) => {
      if(err) return next('Error in userController.verifyUser: comparing password');
      if(matched) {
        res.locals.user = result.rows[0].email;
        res.locals.location = result.row[0].state;
      }
    });
    return next();

  });

}


module.exports = userController;