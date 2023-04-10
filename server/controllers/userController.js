const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt.js');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { email, password, location } = req.body;
  const sqlCommand = `
    INSERT INTO Accounts (username, password, state)
    VALUES ($1, $2, $3);
  `;
  await bcrypt.hash(password, SALT_WORK_FACTOR, function(err, hash) {
    if(err) return next(err);
    password = hash;
  });
  const values = [ email, password, location ];

};

module.exports = userController;