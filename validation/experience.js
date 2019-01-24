// for adding login rules
// for adding registration rules
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data){
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  // check required field - title
  if(Validator.isEmpty(data.title)) {
    errors.title = 'Job title field is required';
  }

  // check required field - company
  if(Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
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