import z from "zod";

const SignInResponse = z.object({
  isSignedIn: z.boolean(),
  nextStep: z.object({
    signInStep: z.string(),
  }),
});

const GetCurrentUserResponse = z.object({
  signInDetails: z.object({
    authFlowType: z.string(),
    loginId: z.string().min(5, "loginId must be at least 5 characters long"),
  }),
  userId: z.string(),
  username: z.string(),
});

const UserCode = z.string().length(6, "Code must be 6 characters long");

const SignUpResponse = z.object({
  isSignUpComplete: z.boolean(),
  nextStep: z.object({
    codeDeliveryDetails: z
      .object({
        attributeName: z.string(),
        deliveryMedium: z.string(),
        destination: z.string(),
      })
      .optional(),
    signUpStep: z.string(),
  }),
  userId: z.string(),
});

const ConfirmSignUpResponse = z.object({
  isSignUpComplete: z.boolean(),
  nextStep: z.object({
    signUpStep: z.string(),
  }),
});

export {
  SignInResponse,
  GetCurrentUserResponse,
  SignUpResponse,
  ConfirmSignUpResponse,
  UserCode,
};

export type GetCurrentUserResponseType = z.infer<typeof GetCurrentUserResponse>;
