import React, {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useReducer,
  PropsWithChildren,
  useRef,
  ReactNode,
} from "react";

export enum ACCOUNT_ACTIONS {
  SET_LOGGED_IN = "SET_LOGGED_IN",
  SET_LOCATION = "SET_LOCATION",
  SET_IP = "SET_IP",
}

export interface ILocation {
  city: string | null;
  country: string | null;
  geonameId: number | null;
  lat: number | null;
  lng: number | null;
  postalCode: string | null;
  region: string | null;
  timezone: string | null;
}

type setLoggedIn = {
  type: typeof ACCOUNT_ACTIONS.SET_LOGGED_IN;
  payload: boolean;
};

type setLocation = {
  type: typeof ACCOUNT_ACTIONS.SET_LOCATION;
  payload: ILocation | null;
};

type setIp = {
  type: typeof ACCOUNT_ACTIONS.SET_IP;
  payload: string;
};

type AccountActions = setLoggedIn | setLocation | setIp;

type AccountState = {
  loggedIn: boolean;
  location: ILocation | null;
  ip: string;
};

type AccountReducer = Reducer<AccountState, AccountActions>;

const reducer: AccountReducer = (state, action) => {
  switch (action.type) {
    case ACCOUNT_ACTIONS.SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload,
      };

    case ACCOUNT_ACTIONS.SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };

    case ACCOUNT_ACTIONS.SET_IP:
      return {
        ...state,
        ip: action.payload,
      };

    default:
      return state;
  }
};

const AccountStateContext = createContext<{
  accountState: AccountState | undefined;
  dispatch: (action: AccountActions) => void;
}>({
  accountState: undefined,
  dispatch: () => {},
});

export const AccountStateProvider: React.FC<PropsWithChildren<ReactNode>> = ({
  children,
}) => {
  const [accountState, dispatch] = useReducer(reducer, {
    loggedIn: false,
    location: null,
    ip: "",
  });
  return (
    <AccountStateContext.Provider
      value={{
        accountState,
        dispatch,
      }}
    >
      {children}
    </AccountStateContext.Provider>
  );
};

export const useAccountStore = () => useContext(AccountStateContext);
export type AccountStoreDispatch = Dispatch<AccountActions>;
