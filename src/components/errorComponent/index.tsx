import * as React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useWalletStore } from "@src/store";
import { StyleSheet } from "react-native";

const ErrorComponent = () => {
  const { showError, errorMessage, setErrorMessage } = useWalletStore();

  const hideDialog = () => setErrorMessage(false, "");

  return (
    <Portal>
      <Dialog visible={showError} onDismiss={hideDialog} style={styles.dialog}>
        <Dialog.Actions>
          <Dialog.Content>
            <Text variant="bodyMedium">{errorMessage}</Text>
          </Dialog.Content>
          <Button onPress={hideDialog}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});

export default ErrorComponent;
