export default function validate(errors, name, value) {
  switch (name) {
    case "username":
      errors.username =
        value.length < 6 ? "Username can't be less than 6 characters" : "";
      break;
    case "email":
      let emailError =
        value.indexOf("@") === -1 ? "Email doesn not cotain @" : "";
      errors.email = emailError;
      break;
    case "password":
      let passwordError;
      if (value.length < 7) {
        passwordError = "Password can't be less than 6 characters";
      }
      let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
      if (!re.test(value)) {
        passwordError = "Password must contain a letter and a number";
      }
      errors.password = passwordError;
      break;
    default:
      return errors;
  }
}
