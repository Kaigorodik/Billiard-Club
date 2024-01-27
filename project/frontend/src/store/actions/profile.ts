import {ClientProfile} from "../../model/users/UserProfile";
import Action from "../Action";
import {ActionType} from "../ActionType";
import {ClubProfile} from "../../model/club/ClubProfile";


export function setProfile(profile: ClientProfile): Action<ClubProfile | ClientProfile> {
    return {
        payload: profile,
        type: ActionType.SetProfile
    }
}

export function setDefaultClientProfile(): Action<ClientProfile> {
    return {
        payload: new ClientProfile(),
        type: ActionType.SetDefaultProfile
    }
}

export function setDefaultClubProfile(): Action<ClubProfile> {
    return {
        payload: new ClubProfile(),
        type: ActionType.SetDefaultProfile
    }
}
