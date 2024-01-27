import {PasswordEditVariants} from "../../model/util/PasswordEditVariants";
import {allNotEmpty} from "../../utils/validationUtils";

export class Password {
    constructor(public password: string, public passwordConfirmation: string, public currentPassword?: string) {
    }

    public isFilledCorrectly(passwordVariant: PasswordEditVariants) {
        switch (passwordVariant) {
            case PasswordEditVariants.SetRegisterPassword:
                return allNotEmpty(this.passwordConfirmation, this.password) &&
                    this.passwordConfirmation === this.password;
            case PasswordEditVariants.ChangePassword:
                return allNotEmpty(this.currentPassword) && this.passwordConfirmation === this.password;
            default:
                throw new Error(`Incorrect passwordVariant: ${passwordVariant}`)
        }
    }
}

export type PasswordState = Password | null;

