import {ClientProfile} from "../../model/users/UserProfile";
import {ClubProfile} from "../../model/club/ClubProfile";

export type ProfileState = ClientProfile | ClubProfile | null;
