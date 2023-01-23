const db = require('../database/database');
function validInput(email, confirmedEmail, password) {
  if (
    !email ||
    !confirmedEmail ||
    !password ||
    email !== confirmedEmail ||
    password.trim().length < 6
  ) {
    return false;
  }
  return true;
}

module.exports = {
  validInput: validInput,
};
