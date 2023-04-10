const fs = require('fs/promises');
const db = require('./model.js');

const updateDb = async () => {
  const readData = async () => {
    const response = await fs.readFile('server/database/storage.json');
    const data = JSON.parse(response);
    return data;
  };
  const { season, seasonProduce, produceStates } = await readData();
  
  for(const produce in produceStates) {
    if(produceStates[produce].length === 0) delete produceStates[produce];
  }
  
  const produceItems = Object.keys(produceStates);
  
  // saving season information
  const saveSeasonInfo = async () => {
    const seasonDates = {
      Spring: ['03-20', '06-20'],
      Summer: ['06-21', '08-31'],
      Fall: ['09-01', '12-20'],
      Winter: ['12-21', '03-19']
    };
    
    for(const season in seasonDates) {
      const [ start_date, end_date ] = seasonDates[season];
      const values = [season, start_date, end_date];
      console.log(values);
      const sqlCommand = `
        INSERT INTO Seasons (season, start_date, end_date)
        VALUES($1, $2, $3)
      `;
      await db.query(sqlCommand, values);
    }
  };
  
  // await saveSeasonInfo();

  //saving produce information

  const saveProduceInfo = async () => {
    for(const name of produceItems) {
      const sqlCommand = `
        INSERT INTO Produce (name)
        VALUES($1)
      `;
      const values = [name];
      await db.query(sqlCommand, values);
    }
  };

  // await saveProduceInfo();

  //saving seasonProduce information
  const saveSeasonProduceInfo = async () => {
    for(const key in seasonProduce){
      for(produce of seasonProduce[key]) {
        if(!produceStates[produce]) continue;
        for(state of produceStates[produce]) {
          const sqlCommand = `
            INSERT INTO SeasonProduce (season, produce, state)
            VALUES($1, $2, $3)
          `;
          const values = [key, produce, state]; 
          await db.query(sqlCommand, values);
        }
      }
    }
  };

  // await saveSeasonProduceInfo();

  // add image links to the Produce table
  const saveImageLinks = async () => {
    for(const produce of produceItems) {
      const link = 'assets/' + produce.replaceAll(' ', '') + '.jpg';
      const sqlCommand = `
        UPDATE Produce
        SET img = '${link}'
        WHERE name = '${produce}';
      `;
      await db.query(sqlCommand);
    }
  };

  await saveImageLinks();

};

updateDb();