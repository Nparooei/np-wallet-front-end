import * as Sentry from "@sentry/react-native";
import { useWalletStore } from "@src/store";

const handleError = (err: unknown) => {
  useWalletStore.getState().setSpinner(false);
  if (err instanceof Error) {
    useWalletStore.getState().setErrorMessage(true, err.message);
  }
};

const sentryProvider = () => {
  Sentry.init({
    dsn: "https://2a3e934380cc58ce556ebcc300a2e3ca@o4507199686574082.ingest.de.sentry.io/4507199689523280",
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
    _experiments: {
      // profilesSampleRate is relative to tracesSampleRate.
      // Here, we'll capture profiles for 100% of transactions.
      profilesSampleRate: 1.0,
    },
  });
};

export { sentryProvider, handleError };
