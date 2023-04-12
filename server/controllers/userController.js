const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');
const db = require('../database/model.js');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { email, password, location } = req.body;
  if(!email || !password || !location) return next('Error in userController.createUser: not given all necessary inputs');

  // finding if user already exists
  try {
    const sqlCommand1 = `
      SELECT * FROM Accounts WHERE email = $1;
    `;
    const values1 = [ email ];
    const result = await db.query(sqlCommand1, values1);
    if(result.rows[0]) {
      res.locals.createdUser = false;
      return next();
    }
  } catch(err) {
    return next('Error in userController.createUser: finding if user already exists');
  }
  // if user does not already exist, create user
  try{
    const sqlCommand2 = `
      INSERT INTO Accounts (email, password, state)
      VALUES ($1, $2, $3)
    `;

    // hashing password before saving user information to the database
    const hashedPW = await bcrypt.hash(password, SALT_WORK_FACTOR);
    // saving information to the database
    const values2 = [ email, hashedPW, location ];
    const result = await db.query(sqlCommand2, values2);
    res.locals.createdUser = true;
  } catch(err) {
    return next('Error in userController.createUser: adding a new user to Accounts table in the database');
  }
  return next();

};

userController.verifyUser = async (req, res, next) => {
  const { email, password } = req.body;
  if(!email || !password) return next('Error in userController.verifyUser: not given all necessary inputs');
  try {
    const sqlCommand = `
      SELECT * FROM Accounts WHERE email = $1;
    `;
    const values = [ email ];
    const result = await db.query(sqlCommand, values);
    if(!result.rows[0]) {
      res.locals.signIn = false;
      return next();
    }
    const matched = await bcrypt.compare(password, result.rows[0].password);
    console.log(matched);
    if(matched) {
      res.locals.signIn = true;
      res.locals.email = result.rows[0].email;
      res.locals.location = result.rows[0].state;
    }
    else res.locals.signIn = false;
  } catch(err){
    return next('Error in userController.verifyUser: verifying the user in the Accounts table of the database');
  }
  return next();
}

userController.changeLocation = async (req, res, next) => {
  // assumes the data will be passed in from req.body
  
  const { email, location } = req.body;
  const values = [email, location];
  const sqlCommand = `
    UPDATE Accounts
    SET state = $2
    WHERE email = $1
    RETURNING *;
  `;

  try {
    const result = await db.query(sqlCommand, values);
    res.locals.location = result.rows[0].state;
    return next();
  } catch (err) {
    return next('Error in userController.changeLocation: location not changed')
  }
};

module.exports = userController;