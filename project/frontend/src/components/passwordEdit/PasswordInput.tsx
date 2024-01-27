import {useDispatch, useSelector} from "react-redux";
import getPassword from "../../hooks/getPassword";
import React from "react";
import {setRegisterPassword} from "../../store/actions/password";
import DefaultInput from "../DefaultInput";
import {getOnFieldChange} from "../../utils/utils";
import ErrorMessage from "../ErrorMessage";
import {orDefault} from "../../utils/validationUtils";

export function PasswordInput() {
    const dispatch = useDispatch();

    const passwordState = useSelector(getPassword);
    const [password, setPassword] = React.useState(orDefault(passwordState?.password, ''));
    const [passwordConfirmation, setPasswordConfirmation] = React.useState(orDefault(passwordState?.passwordConfirmation, ''));

    function onSetPassword(password: string) {
        setPassword(password);
        if (password === passwordConfirmation) {
            dispatch(setRegisterPassword(password, passwordConfirmation as string));
        }
    }

    function onSetPasswordConfirmation(confirmation: string) {
        setPasswordConfirmation(confirmation);
        if (password === confirmation) {
            dispatch(setRegisterPassword(password as string, confirmation));
        }
    }

    return (<>
        <DefaultInput label="Пароль" type="password" fullWidth={true} required
                      inputProps={{'data-testid': "password-input"}}
                      value={password} onChange={getOnFieldChange(onSetPassword)}/>
        <DefaultInput label="Подтверждение пароля" type="password" fullWidth={true} required
                      inputProps={{'data-testid': "password-confirm-input"}}
                      value={passwordConfirmation} onChange={getOnFieldChange(onSetPasswordConfirmation)}/>
        <ErrorMessage message='Пароль и подтверждение не совпадают' condition={password !== passwordConfirmation}/>
    </>);
}
