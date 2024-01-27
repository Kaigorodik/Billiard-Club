import {StorageKeys} from "../../utils/StorageKeys";
import {UserLogin} from "../../model/users/UserLogin";

export class Login {
    constructor(public user: UserLogin, public accessToken: string | null, public refreshToken: string | null) {
    }
}

export function persist(login: Login) {
    localStorage.setItem(StorageKeys.Login, JSON.stringify(login.user));
    localStorage.setItem(StorageKeys.AccessToken, login.accessToken as string);
    localStorage.setItem(StorageKeys.RefreshToken, login.refreshToken as string);
}

export function restore() {
    return localStorage.getItem(StorageKeys.Login) !== null ?
        new Login(JSON.parse(localStorage.getItem(StorageKeys.Login) as string),
            localStorage.getItem(StorageKeys.AccessToken), localStorage.getItem(StorageKeys.RefreshToken)) : null;
}

export type LoginState = Login | null;

export const initState = restore();
