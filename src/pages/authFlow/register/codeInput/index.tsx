import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { AuthFlowContainer } from "@src/containers/authFlow";
import { handleConfirmationCode } from "@src/services/authentication";
import { useWalletStore } from "@src/store";
import { handleError } from "@src/services/errorHandling";
import { UserCode } from "@src/types/authentication";
import useNav from "@src/hooks/nav";

const CodeInputPage: React.FC = () => {
  const [code, setCode] = useState("");
  const { email } = useWalletStore();
  const { setSpinner } = useWalletStore();
  const nav = useNav();

  const handleVerify = async () => {
    try {
      checkCode(code);
      setSpinner(true);
      await handleConfirmationCode(email, code);
      nav.navigate("login-page");
      setSpinner(false);
    } catch (error) {
      handleError(error);
    }
  };

  const checkCode = (code: string) => {
    UserCode.parse(code);
  };

  return (
    <AuthFlowContainer>
      <Text style={styles.text}>
        {"We have sent a code to your email please enter it here."}
      </Text>
      <TextInput
        label="Code"
        value={code}
        onChangeText={setCode}
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
      />
      <Button mode="contained" onPress={handleVerify} style={styles.button}>
        Verify
      </Button>
    </AuthFlowContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    width: "100%",
    textAlign: "justify",
    marginBottom: 30,
    marginTop: 30,
    maxWidth: 300,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    maxWidth: 300,
  },
  button: {
    width: "50%",
    marginTop: 20,
  },
});

export { CodeInputPage };
