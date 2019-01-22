const isEmpty = (value) => 
// {
  // return(
    value === undefined ||
    value === null ||
    // if there's an empty object (keys.length === 0 equals to an empty objects)
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    // if there's an empty string
    (typeof value === 'string' && value.trim().length === 0);
  // )
// }

module.exports = isEmpty;