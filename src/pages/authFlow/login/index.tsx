import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { handleSignIn } from "@src/services/authentication";
import { AuthFlowContainer } from "@src/containers/authFlow";
import { handleError } from "@src/services/errorHandling";
import { useWalletStore } from "@src/store";
import { setLoginState } from "@src/store/constants";
import useNav from "@src/hooks/nav";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNav();
  const { setAuth, setSpinner } = useWalletStore();
  const signInPress = async () => {
    try {
      setSpinner(true);
      const signInResult = await handleSignIn({
        email,
        password,
      });
      setSpinner(false);
      const { isSignedIn, nextStep } = signInResult;
      const { signInStep } = nextStep;
      if (signInStep === "CONFIRM_SIGN_UP") {
        nav.navigate("code-page");
      }
      setAuth({ auth: setLoginState(isSignedIn), email: email, id: "" });
    } catch (error) {
      handleError(error);
    }
  };

  const signUpPress = () => {
    nav.navigate("email-page");
  };

  return (
    <AuthFlowContainer>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={signInPress}
        style={styles.signInButton}
      >
        Sign In
      </Button>
      <Button mode="text" onPress={signUpPress} style={styles.signUpButton}>
        Sign Up
      </Button>
    </AuthFlowContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    marginBottom: 10,
    maxWidth: 300,
  },
  signInButton: {
    width: "50%",
    marginTop: 20,
  },
  signUpButton: {
    width: "50%",
    marginTop: 3,
  },
});

export { LoginPage };
