const db = require('../database/model.js');
const produceController = {};

produceController.getAllProduce = async (req, res, next) => {
  const { location } = req.body();
  // const months = {
  //   December: 12
  //   January: 1,
  //   February: 2,

  //   March: 3,
  //   April: 4,
  //   May: 5,

  //   June: 6,
  //   July: 7,
  //   August: 8,

  //   September: 9,
  //   October: 10,
  //   November: 11,
  //
  // };
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

  `;

};

module.exports = produceController;
