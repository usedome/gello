import { AxiosError } from "axios";
import { useContext, Dispatch } from "react";
import { useHistory, useParams } from "react-router-dom";
import { TAppAction } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { useErrorHandler, TError } from "../../../utilities";
import { client } from "../client";
import { TUpdateUserResponse } from "./types";

export const useVerifyUser = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const history = useHistory();
  const { token } = useParams<{ token: string }>();
  const errorHandler = useErrorHandler();

  return async () => {
    try {
      const {
        data: { user },
      } = await client().post<TUpdateUserResponse>(`/me/verify/${token}`);
      dispatch({ type: "SET_USER", payload: user });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "success",
          text: `${user.email} has been verified successfully!`,
        },
      });
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }

    history.push("/");
  };
};
