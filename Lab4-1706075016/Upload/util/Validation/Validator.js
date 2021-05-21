function minCharLength(data, len) {
  return data.length >= len;
}

function minValLength(data, len) {
  return data >= len;
}

function isRequired(data) {
  return data !== null && data !== undefined && data !== "";
}

function isEmail(data) {
  return data.includes("@") && data.split("@")[1].includes(".");
}

function hasLowerCase(data) {
  const lowercaseCharPassword = new RegExp("^(?=.*[a-z])");
  return lowercaseCharPassword.test(data);
}

function hasUpperCase(data) {
  const uppercaseCharPassword = new RegExp("^(?=.*[A-Z])");
  return uppercaseCharPassword.test(data);
}

function hasNumericCase(data) {
  const numericCharPassword = new RegExp("^(?=.*[0-9])");
  return numericCharPassword.test(data);
}

function hasSpecialCase(data) {
  const specialCharPassword = new RegExp("^(?=.*[!@#$%^&*()])");
  return specialCharPassword.test(data);
}

function isSameAs(data, dataCompare) {
  return data === dataCompare;
}

module.exports = {
  minCharLength,
  minValLength,
  isEmail,
  hasLowerCase,
  hasUpperCase,
  hasNumericCase,
  hasSpecialCase,
  isSameAs,
  isRequired,
};
