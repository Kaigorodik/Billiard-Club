import {PasswordEditVariants} from "../../model/util/PasswordEditVariants";
import React from "react";
import IPasswordEditProps from "../../model/props/IPasswordEditProps";
import {PasswordInput} from "./PasswordInput";
import {PasswordEditor} from "./PasswordEditor";


export default function PasswordEdit({passwordVariant}: IPasswordEditProps) {
    switch (passwordVariant) {
        case PasswordEditVariants.SetRegisterPassword:
            return <PasswordInput/>;
        case PasswordEditVariants.ChangePassword:
            return <PasswordEditor/>;
        default:
            throw new Error(`Incorrect password variant ${passwordVariant}`);
    }
}

