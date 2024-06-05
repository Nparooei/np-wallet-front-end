export type LoginSliceType = {
  auth: "CHECKING_AUTH" | "LOGGED_IN" | "LOGGED_OUT";
  email: string;
  id: string;
  setAuth: (authInfo: AuthInfo) => void;
};

type AuthInfo = Omit<LoginSliceType, "setAuth">;
type HandlerFn = (state: AuthInfo) => void;
type CreateLoginSliceType = (set: HandlerFn) => LoginSliceType;
export const createLoginSlice: CreateLoginSliceType = (set: HandlerFn) => ({
  auth: "CHECKING_AUTH",
  email: "",
  id: "",
  setAuth: (authInfo: AuthInfo) =>
    set({
      auth: authInfo.auth,
      email: authInfo.email,
      id: authInfo.id,
    }),
});
