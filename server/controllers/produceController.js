const db = require('../database/model.js');
const produceController = {};

produceController.getAllProduce = async (req, res, next) => {
  const location = req.params.location;
  const currentMonth = new Date().getMonth();

  const getSeason = (month) => {
    if (month === 12 || month <= 2) return 'Winter';
    if (month >= 3 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Fall';
    else return 'Error: month not found'
  }
  const currentSeason = getSeason(currentMonth);

  // ** TO DO - finish the SQL command **
  const sqlCommand = `
    SELECT name, img 
    FROM Produce RIGHT OUTER JOIN SeasonProduce
    ON produce = name
    WHERE season = $1 AND state = $2;
  `;
  const values = [ currentSeason, location ];
  await db.query(sqlCommand, values, (err, result) => {
    if(err) return next('Error in produceController.getAllProduce: getting all produce from the database based on location and season');
    res.locals.produce = result.rows;
    return next();
  });

};

module.exports = produceController;
