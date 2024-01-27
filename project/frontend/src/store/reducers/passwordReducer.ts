import Action from "../Action";
import {ActionType} from "../ActionType";
import {PasswordState, Password} from "../state/PasswordState";

export default function passwordReducer(state: PasswordState = null, action: Action<Password | string>) {
    switch (action.type) {
        case ActionType.SetRegisterPassword:
        case ActionType.ChangePassword:
            return action.payload;
        default:
            return state;
    }
}
