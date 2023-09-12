/**
 * Validate a given string to be formatted as email
 * @param {String} email
 * @returns
 */
function validateEmail(email) {
  const emailRegex = new RegExp(
    // eslint-disable-next-line
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  );
  return emailRegex.test(email);
}
export default validateEmail;
