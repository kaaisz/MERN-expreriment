// for adding login rules
// for adding registration rules
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data){
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  // check required field - school
  if(Validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }

  // check required field - degree
  if(Validator.isEmpty(data.degree)) {
    errors.degree = 'degree field is required';
  }

  // check required field - fieldofstudy
  if(Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study field is required';
  }

  // check required field - from
  if(Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  // if everything is passed, return will be isValid: isEmpty(errors)
  // if not, errors.name above and error status in users.js will return 
  return {
    errors, // minify 'errors: errors'
    isValid: isEmpty(errors),
  };
};