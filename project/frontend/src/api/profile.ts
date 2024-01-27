import {getDefaultDownloadHandler, getDefaultUploadHandler, getQueryString, getTokenHeader} from "../utils/fetchUtils";
import GenericResponse from "../model/dto/GenericResponse";
import {UserLogin} from "../model/users/UserLogin";
import {ClientProfile} from "../model/users/UserProfile";
import {ClubProfile} from "../model/club/ClubProfile";

/**
 * @return current user profile
 */
export function getCurrentUserProfile() {
    return fetch('/api/profile', {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler('Ошибка получения профиля'))
        .then((r: GenericResponse<UserLogin>) => {
            return r.data;
        });
}

/**
 * @return club's profile
 */
export function getClubProfile(clubId: string) {
    return fetch('/api/club?' + getQueryString({clubId}), {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler('Ошибка получения данных о клуба'))
        .then((r: GenericResponse<UserLogin>) => {
            return r.data;
        });
}

/**
 * @return current username
 */
export function update(user: ClientProfile | ClubProfile, password?: string, newPassword?: string) {
    let user_json;
    if (newPassword) {
        user_json = {
            ...user,
            password,
            newPassword
        }
    } else {
        user_json = {
            ...user,
            password
        }
    }
    return fetch(`/api/profile/${user.role}`, {

        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            ...getTokenHeader()
        },
        body: JSON.stringify(user_json)
    }).then(getDefaultUploadHandler());
}
