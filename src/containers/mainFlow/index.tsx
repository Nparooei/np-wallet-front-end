import React from "react";
import {
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ReactElement } from "react";
import ErrorComponent from "@src/components/errorComponent";
import SpinnerComponent from "@src/components/spinnerComponent";

interface containerProps {
  children: ReactElement[] | ReactElement;
}

const MainFlowContainer: React.FC<containerProps> = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ErrorComponent />
        <SpinnerComponent />
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export { MainFlowContainer };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    alignItems: "center",
  },
});
