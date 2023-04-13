const db = require('../database/model.js');

const sessionController = {};

sessionController.isSignedIn = async (req, res, next) => {
  if(!req.cookies.ssid) return res.redirect('/sign-in');
  const sqlCommand = `
    SELECT * FROM Sessions WHERE cookie_id = $1;
  `;
  const values = [ req.cookies.ssid ];
  await db.query(sqlCommand, values, (err, result) => {
    if(err) return next('Error in sessionController.isSignedIn: finding if session exists in Sessions table of the database');
    if(!result.rows[0].cookie_id) return res.redirect('/sign-in');
  });
  return next();

};

sessionController.startSession = async (req, res, next) => {
  const sqlCommand = `
    INSERT INTO Sessions (cookie_id)
    VALUES($1)
    RETURNING *;
  `;
  const values = [ req.cookies.ssid ];
  await db.query(sqlCommand, values, (err, result) => {
    if(err) return next('Error in sessionController.startSession: creating a new session in Sessions table of the database');
  });
  return next();
};

sessionController.endSession = async (req, res, next) => {
  if(!req.cookies.ssid) return next();
  const sqlCommand = `
    DELETE TOP(1) FROM Sessions
    WHERE cookie_id = $1;
  `;
  const values = [ req.cookies.ssid ];
  await db.query(sqlCommand, values, (err, result) => {
    if(err) return next('Error in sessionController.startSession: deleting session in the Sessions table of the database');
  });
  return next();
};

module.exports = sessionController;