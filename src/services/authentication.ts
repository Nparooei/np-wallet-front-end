import {
  signIn,
  signOut,
  getCurrentUser,
  signUp,
  confirmSignUp,
} from "aws-amplify/auth";
import { useWalletStore } from "@src/store";
import {
  ConfirmSignUpResponse,
  GetCurrentUserResponse,
  SignInResponse,
  SignUpResponse,
} from "@src/types/authentication";
import { LOGGED_IN } from "@src/store/constants";

type SignInInput = {
  email: string;
  password: string;
};

type SignUpInput = SignInInput;

const currentAuthenticatedUser = async () => {
  console.log("checking auth 2");
  const getCurrentUserResponse = await getCurrentUser();
  console.log("checking auth 3");
  const getCurrentUserResponseParsed = GetCurrentUserResponse.parse(
    getCurrentUserResponse,
  );
  console.log("checking auth 4");
  const { signInDetails, userId } = getCurrentUserResponseParsed;
  const { loginId } = signInDetails;
  console.log("checking auth 5");
  useWalletStore
    .getState()
    .setAuth({ email: loginId, auth: LOGGED_IN, id: userId });
  console.log("checking auth 6");
  return true;
};

const handleSignIn = async ({ email: username, password }: SignInInput) => {
  const signInResponse = await signIn({
    username,
    password,
    options: {
      authFlowType: "USER_PASSWORD_AUTH",
    },
  });
  SignInResponse.parse(signInResponse);
  const { isSignedIn, nextStep } = signInResponse;

  return { isSignedIn, nextStep };
};

const handleSignUp = async ({ email: username, password }: SignUpInput) => {
  const signUpResponse = await signUp({
    username,
    password,
  });

  const { userId, isSignUpComplete } = signUpResponse;
  SignUpResponse.parse(signUpResponse);
  return { userId, isSignUpComplete };
};

const handleConfirmationCode = async (username: string, code: string) => {
  const confirmSignUpResponse = await confirmSignUp({
    username,
    confirmationCode: code,
  });
  ConfirmSignUpResponse.parse(confirmSignUpResponse);
  const { isSignUpComplete } = confirmSignUpResponse;
  return isSignUpComplete;
};

const handleSignOut = async () => {
  await signOut();
};

export {
  handleSignIn,
  handleSignUp,
  handleConfirmationCode,
  handleSignOut,
  currentAuthenticatedUser,
};
