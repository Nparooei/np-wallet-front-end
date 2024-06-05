import * as React from "react";
import { sentryProvider } from "./services/errorHandling";
import * as Sentry from "@sentry/react-native";
import { SplashScreen } from "./pages/splashFlow";

sentryProvider();

const App = () => {
  return <SplashScreen />;
};

export default Sentry.wrap(App);
