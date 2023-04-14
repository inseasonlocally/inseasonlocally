const db = require('../database/model.js');
const produceController = {};

produceController.getAllProduce = async (req, res, next) => {
  // req.params.location will provide the user's current location
  const location = req.params.location;
  const currentMonth = new Date().getMonth();

  // determine the season based on current date
  const getSeason = (month) => {
    if (month === 12 || month <= 2) return 'Winter';
    if (month >= 3 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Fall';
    else return 'Error: month not found'
  }
  const currentSeason = getSeason(currentMonth);

  // obtain produce information filtered by season and location
  const sqlCommand = `
    SELECT name, img 
    FROM Produce RIGHT OUTER JOIN SeasonProduce
    ON produce = name
    WHERE season = $1 AND state = $2;
  `;
  const values = [currentSeason, location];
  await db.query(sqlCommand, values, (err, result) => {
    if (err) return next({
      log: 'Error in produceController.getAllProduce: getting all produce from the database based on location and season',
      status: 400,
      message: err.message
    });
    res.locals.produce = result.rows;
    return next();
  });

};

module.exports = produceController;
