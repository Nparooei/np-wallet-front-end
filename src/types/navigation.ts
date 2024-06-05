import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type LoginParamList = {
  "login-page": undefined;
  "code-page": undefined;
  "password-page": undefined;
  "email-page": undefined;
};

type MainParamList = {
  "main-page": undefined;
};

type LoginNavigationProp = NativeStackNavigationProp<LoginParamList>;
type MainNavigationProp = NativeStackNavigationProp<MainParamList>;

export type {
  LoginParamList,
  MainParamList,
  LoginNavigationProp,
  MainNavigationProp,
};
