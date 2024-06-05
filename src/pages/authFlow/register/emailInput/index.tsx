import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { AuthFlowContainer } from "@src/containers/authFlow";
import { handleSignUp } from "@src/services/authentication";
import { useWalletStore } from "@src/store";
import { handleError } from "@src/services/errorHandling";
import { setLoginState } from "@src/store/constants";
import useNav from "@src/hooks/nav";

const EmailInputPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAuth, setSpinner } = useWalletStore();
  const nav = useNav();
  const handleVerify = async () => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      setSpinner(true);
      const { userId, isSignUpComplete } = await handleSignUp({
        email,
        password,
      });
      setSpinner(false);
      if (userId) {
        setAuth({
          auth: setLoginState(isSignUpComplete),
          email: email,
          id: userId,
        });
        nav.navigate("code-page");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <AuthFlowContainer>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.emailInput}
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
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />
      <Button mode="contained" onPress={handleVerify} style={styles.button}>
        Sign Up
      </Button>
    </AuthFlowContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    marginBottom: 5,
    maxWidth: 300,
  },
  emailInput: {
    width: "100%",
    marginBottom: 30,
    maxWidth: 300,
  },
  button: {
    width: "50%",
    marginTop: 20,
  },
});

export { EmailInputPage };
