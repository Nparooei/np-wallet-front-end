import * as React from "react";
import { PaperProvider } from "react-native-paper";
import App from "./src";
import { Amplify } from "aws-amplify";

import amplifyConfig from "./src/amplifyconfiguration.json";

import "react-native-reanimated";

Amplify.configure(amplifyConfig);

const Main = () => {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
};

export default Main;
