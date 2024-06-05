import React from "react";
import {
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from "react-native";
import { ReactElement } from "react";
import ErrorComponent from "@src/components/errorComponent";
import SpinnerComponent from "@src/components/spinnerComponent";
import { Logo } from "@src/components/images/logo";

interface containerProps {
  children: ReactElement[] | ReactElement;
}

const AuthFlowContainer: React.FC<containerProps> = ({ children }) => {
  const screenHeight = Dimensions.get("window").height;
  const showLogo = screenHeight > 700;
  const shouldShowLogo = () => {
    if (showLogo) {
      return <Logo />;
    } else {
      return <View style={styles.emptyView} />;
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ErrorComponent />
        <SpinnerComponent />
        {shouldShowLogo()}
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export { AuthFlowContainer };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  emptyView: {
    marginBottom: 40,
  },
});
