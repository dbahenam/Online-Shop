function isEmpty(value) {
  if (!value || value.trim() === '') {
    return true;
  }
  return false;
}

function validInput(data) {
  if (
    !data.email ||
    !data.confirmEmail ||
    data.email !== data.confirmEmail ||
    isEmpty(data.password) ||
    isEmpty(data.fullName) ||
    isEmpty(data.street) ||
    isEmpty(data.postalCode) ||
    isEmpty(data.city)
  ) {
    return false;
  }
  return true;
}

module.exports = {
  validInput: validInput,
};
