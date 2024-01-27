import {ActionType} from "../ActionType";
import {initState, LoginState} from "../state/LoginState";
import Action from "../Action";

// export function logoutAction() {
//     return {
//         type: ActionType.Logout,
//         payload: initState
//     }
// }

export function setLoginAction(userLogin: LoginState): Action<LoginState> {
    return {
        type: ActionType.Login,
        payload: userLogin
    };
}
