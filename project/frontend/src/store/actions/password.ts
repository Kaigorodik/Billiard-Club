import Action from "../Action";
import {ActionType} from "../ActionType";
import {Password, PasswordState} from "../state/PasswordState";

export function setRegisterPassword(password: string, passwordConfirmation: string): Action<Password> {
    return {
        payload: new Password(password, passwordConfirmation),
        type: ActionType.SetRegisterPassword
    }
}

export function changePassword(password: string, passwordConfirmation: string, currentPassword: string): Action<Password> {
    return {
        payload: new Password(password, passwordConfirmation, currentPassword),
        type: ActionType.ChangePassword
    }
}
