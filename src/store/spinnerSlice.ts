export type SpinnerSliceType = {
  showSpinner: boolean;
  setSpinner: (showSpinner: boolean) => void;
};

type SpinnerInfo = Omit<SpinnerSliceType, "setSpinner">;
type HandlerFn = (state: SpinnerInfo) => void;

export const createSpinnerSlice = (set: HandlerFn) => ({
  showSpinner: false,
  setSpinner: (showSpinner: boolean) =>
    set({
      showSpinner,
    }),
});
