import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {initState, Login, LoginState, persist} from "../state/LoginState";
import {ActionType} from "../ActionType";
import Action from "../Action";
import {StorageKeys} from "../../utils/StorageKeys";

const authSlice = createSlice({
    name: "message",
    initialState: initState,
    reducers: {
        logoutAction(state: LoginState) {
            localStorage.removeItem(StorageKeys.Login);
            localStorage.removeItem(StorageKeys.RefreshToken);
            localStorage.removeItem(StorageKeys.AccessToken);
            return null;
        },
        setLoginAction(state: LoginState, action: PayloadAction<LoginState>) {
            persist(action.payload as Login);
            return action.payload;
        }

    }
});

export const {
    logoutAction,
    setLoginAction
} = authSlice.actions;

export default authSlice.reducer;
