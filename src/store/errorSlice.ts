export type ErrorSliceType = {
  errorMessage: string;
  showError: boolean;
  setErrorMessage: (showError: boolean, errorMessage: string) => void;
};

type ErrorInfo = Omit<ErrorSliceType, "setErrorMessage">;
type HandlerFn = (state: ErrorInfo) => void;

export const createErrorSlice = (set: HandlerFn) => ({
  errorMessage: "",
  showError: false,
  setErrorMessage: (showError: boolean, errorMessage: string) =>
    set({
      showError,
      errorMessage,
    }),
});
