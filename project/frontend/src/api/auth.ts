// import UserProfile from "../model/users/UserProfile";
import GenericResponse from "../model/dto/GenericResponse";
import {StorageKeys} from "../utils/StorageKeys";
import RefreshToken from "../model/dto/RefreshToken";
import {UserLogin} from "../model/users/UserLogin";
import {Login} from "../store/state/LoginState";
import {getDefaultDownloadHandler, getDefaultUploadHandler, getTokenHeader} from "../utils/fetchUtils";
import {ClientProfile} from "../model/users/UserProfile";
import {ClubProfile} from "../model/club/ClubProfile";

/**
 * @return current username
 */
// export function getCurrentUser() {
//     if (localStorage.getItem(StorageKeys.AccessToken))
//         return fetch('/api/users/currentuser', {
//             headers: getTokenHeader()
//         }).then(getDefaultDownloadHandler('Not authorized'));
// }


/**
 * @return current username
 */
export function login(email: string, password: string) {
    return fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({login: email, password})
    }).then(getDefaultDownloadHandler('Ошибка авторизации'))
        .then((r: GenericResponse<Login>) => {
            return r.data;
        });
}

/**
 * @return current username
 */
export function register(user: ClientProfile | ClubProfile, password: string) {
    console.log(user);
    return fetch(`/api/auth/signup/${user.role}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...user,
            password
        })
    }).then(getDefaultDownloadHandler('Ошибка регистрации'))
        .then((r: GenericResponse<Login>) => {
            return r.data;
        });
}

export function refreshToken(): Promise<GenericResponse<RefreshToken>> {
    return fetch(`/api/auth/refreshtoken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: `{"tokenRefresh": "${localStorage.getItem(StorageKeys.RefreshToken)}"}`
    }).then(getDefaultDownloadHandler()).catch(console.log);
}

const REFRESH_TOKEN_TIMEOUT = 2000000;//TODO: test

function refreshTokenScheduler() {
    if (localStorage.getItem(StorageKeys.AccessToken) !== null) {
        refreshToken().then(r => r.data).then(r => {
            localStorage.setItem(StorageKeys.AccessToken, r.accessToken);
            localStorage.setItem(StorageKeys.RefreshToken, r.refreshToken);
            console.log(`Token refreshed access: ${r.accessToken} refresh: ${r.refreshToken}`);
        });
    }
    setTimeout(refreshTokenScheduler, REFRESH_TOKEN_TIMEOUT);
}

setTimeout(refreshTokenScheduler, REFRESH_TOKEN_TIMEOUT);
