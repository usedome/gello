import { TUser } from "../..";
import { TCommonApiResponse } from "../types";

export type TVerifyGoogleAuth = TCommonApiResponse & {
  user: TUser;
  token: string;
};
