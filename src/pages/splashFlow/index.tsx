import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { MainFlowContainer } from "@src/containers/mainFlow";
import { ActivityIndicator } from "react-native-paper";
import { currentAuthenticatedUser } from "@src/services/authentication";
import { useWalletStore } from "@src/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CodeInputPage } from "@src/pages/authFlow/register/codeInput";
import { EmailInputPage } from "@src/pages/authFlow/register/emailInput";
import { LoginPage } from "@src/pages/authFlow/login";
import { DashboardPage } from "@src/pages/mainFlow/dashboard";
import { LoginParamList, MainParamList } from "@src/types/navigation";
import { Logo } from "@src/components/images/logo";
import { LOGGED_IN, LOGGED_OUT } from "@src/store/constants";

const RootStack = createNativeStackNavigator<LoginParamList & MainParamList>();

const SplashScreen: React.FC = () => {
  const { setAuth } = useWalletStore();
  const checkAuth = async () => {
    try {
      console.log("checking auth");
      await currentAuthenticatedUser();
      console.log("checking auth 7");
    } catch (error) {
      setAuth({ auth: LOGGED_OUT, email: "", id: "" });
      console.log("error in auth", error);
    }
  };

  const { auth } = useWalletStore();

  useEffect(() => {
    (async () => await checkAuth())();
  }, [auth]);

  switch (auth) {
    case LOGGED_OUT:
      console.log("auth log out", auth);
      return (
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen
              name="login-page"
              component={LoginPage}
              options={{ title: "Login" }}
            />
            <RootStack.Screen
              name="code-page"
              component={CodeInputPage}
              options={{ title: "" }}
            />
            <RootStack.Screen
              name="email-page"
              component={EmailInputPage}
              options={{ title: "" }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      );
    case LOGGED_IN:
      console.log("auth log in", auth);
      return (
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen
              name="main-page"
              component={DashboardPage}
              options={{ title: "hello world Page" }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      );
    default:
      console.log("auth checking", auth);
      return (
        <MainFlowContainer>
          <View style={styles.container}>
            <Logo />
            <ActivityIndicator />
          </View>
        </MainFlowContainer>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
export { SplashScreen };
