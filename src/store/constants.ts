const LOGGED_IN = "LOGGED_IN";
const LOGGED_OUT = "LOGGED_OUT";

const setLoginState = (currentState: boolean) => {
  if (currentState) return LOGGED_IN;
  return LOGGED_OUT;
};

export { LOGGED_IN, LOGGED_OUT, setLoginState };
