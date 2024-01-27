import Action from "../Action";
import {ActionType} from "../ActionType";
import {ClientProfile} from "../../model/users/UserProfile";
import {ProfileState} from "../state/ProfileState";
import {ClubProfile} from "../../model/club/ClubProfile";

export default function profileReducer(state: ProfileState = null, action: Action<ClubProfile | ClientProfile>) {
    switch (action.type) {
        case ActionType.SetProfile:
            return action.payload;
        case ActionType.SetDefaultProfile:
            return !state ? action.payload : state;
        default:
            return state;
    }
}
