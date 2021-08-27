
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


module.exports = {
  getColors,
  makeQuery,
}