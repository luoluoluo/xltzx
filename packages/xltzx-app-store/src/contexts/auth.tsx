"use client";

import { User } from "@/generated/graphql";
import { Dispatch, Reducer, createContext, useReducer } from "react";

export interface AuthState {
  token?: string;
  me?: User;
}

interface AuthAction {
  type: "setToken" | "setMy";
  payload: {
    token?: string;
    me?: User;
  };
}

const reducer: Reducer<AuthState, AuthAction> = (state: AuthState, action: AuthAction) => {
  const newState: AuthState = { ...state };
  switch (action.type) {
    case "setToken":
      newState.token = action.payload.token;
      return newState;
    case "setMy":
      newState.me = action.payload.me;
      return newState;
    default:
      return newState;
  }
};

// const initialContext: {
//   state: AuthState;
//   dispatch: Dispatch<AuthAction>;
// } = {
//   state: {},
//   dispatch: () => {
//     return;
//   }
// };

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}>({
  state: {},
  dispatch: () => {}
});

export const AuthContextProvider = ({ initialState, children }: { initialState: AuthState; children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
