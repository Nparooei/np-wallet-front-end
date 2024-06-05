import { create } from "zustand";
import { LoginSliceType, createLoginSlice } from "./authSlice";
import { ErrorSliceType, createErrorSlice } from "./errorSlice";
import { SpinnerSliceType, createSpinnerSlice } from "./spinnerSlice";

export const useWalletStore = create<
  LoginSliceType & ErrorSliceType & SpinnerSliceType
>((set) => ({
  ...createLoginSlice(set),
  ...createErrorSlice(set),
  ...createSpinnerSlice(set),
}));
