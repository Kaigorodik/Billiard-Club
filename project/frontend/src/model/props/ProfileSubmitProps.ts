import {ClientProfile} from "../users/UserProfile";
import IPasswordEditProps from "./IPasswordEditProps";
import {ClubProfile} from "../club/ClubProfile";

export interface ProfileSubmitProps {
    onSubmit: (profile: ClientProfile | ClubProfile) => void
}

export class ProfileLabels {
    constructor(public titleLabel: string, public submitLabel: string) {
    }
}

export interface ProfileProps extends ProfileSubmitProps, IPasswordEditProps {
    // profile?: ClientProfile
    labels: ProfileLabels
}


const RegisterLabels = new ProfileLabels("Регистрация", "Зарегистрироваться");
const EditProfileLabels = new ProfileLabels("Редактирование профиля", "Подтверить изменения");

export {
    RegisterLabels,
    EditProfileLabels
}
