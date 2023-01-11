const validateMail = (val?: string | unknown) => {
  if (typeof val !== "string") {
    return false;
  }
  const expression: RegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return expression.test(val);
};

const validatePassword = (val?: string | unknown) => {
  if (typeof val === "string" && val.length > 5) {
    return true;
  }
  return false;
};

export { validateMail, validatePassword };
