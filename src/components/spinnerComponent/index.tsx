import * as React from "react";
import { ActivityIndicator, Dialog, Portal } from "react-native-paper";
import { useWalletStore } from "@src/store";
import { StyleSheet } from "react-native";

const SpinnerComponent = () => {
  const { showSpinner } = useWalletStore();

  return (
    <Portal>
      <Dialog visible={showSpinner} style={styles.dialog}>
        <Dialog.Content>
          <ActivityIndicator size={"small"} />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    alignItems: "center",
    width: 60,
    height: 60,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});

export default SpinnerComponent;
