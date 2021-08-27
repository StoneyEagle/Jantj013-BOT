
const colors = require('./colors');

/**
 * * Converts Discord numeric colors to object with name and hex.
 * @param {number} number
 */
const getColors = (number) => {
  let color = colors.find(c => c.color == number);
  return {
    color: number,
    hex: number == 0 ? '#000' : '#' + Number(number).toString(16).toUpperCase(),
    name: color?.name
  }
}

/**
 * * Creates query argument string from query object.
 * @param {object} query
 */
const makeQuery = (query) => {

  let send = [];
  
  for (const [key, value] of Object.entries(query)) {
    send.push(`${key}=${value}`);
  };

  return '?' + send.join(',');
};

const diff = (obj1, obj2) => {
  let difs = [];
  
  for(key of Object.keys(obj1)){
    if(typeof obj1[key] != 'object' && obj1[key] != obj2[key]){
      difs.push({
        key: key,
        from: obj1[key],
        to: obj2[key],
      });
    } 
    else if(obj1[key] && typeof obj1[key] == 'object'){
      for(key2 of Object.keys(obj1[key])){
        if(obj1[key][key2] != obj2[key][key2]){
          difs.push({
            key: key2,
            from: obj1[key][key2],
            to: obj2[key][key2],
          });
          
        }
      }
    }
  }
  
  return difs;
}



module.exports = {
  getColors,
  makeQuery,
  diff,
}