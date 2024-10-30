export function validateEmail(email: string) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string) {
  const lengthCheck = /^.{8,20}$/;
  const uppercaseCheck = /[A-Z]/;
  const lowercaseCheck = /[a-z]/;
  const numberCheck = /\d/;
  const symbolCheck = /[!@#$%^&*(),.?":{}|<>]/;

  return (
    lengthCheck.test(password) &&
    uppercaseCheck.test(password) &&
    lowercaseCheck.test(password) &&
    numberCheck.test(password) &&
    symbolCheck.test(password)
  );
}
