import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { MainFlowContainer } from "@src/containers/mainFlow";
import { handleSignOut } from "@src/services/authentication";
import { handleError } from "@src/services/errorHandling";
import { useWalletStore } from "@src/store";
import { LOGGED_OUT } from "@src/store/constants";

const DashboardPage: React.FC = () => {
  const { setAuth, setSpinner } = useWalletStore();
  const signOutPress = async () => {
    try {
      setSpinner(true);
      await handleSignOut();
      setAuth({ auth: LOGGED_OUT, email: "", id: "" });
      setSpinner(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <MainFlowContainer>
      <Button mode="contained" onPress={signOutPress} style={styles.button}>
        Sign Out
      </Button>
    </MainFlowContainer>
  );
};

const styles = StyleSheet.create({
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
export { DashboardPage };
