import {useDispatch, useSelector} from "react-redux";
import getPassword from "../../hooks/getPassword";
import React from "react";
import {changePassword} from "../../store/actions/password";
import DefaultInput from "../DefaultInput";
import {getOnFieldChange} from "../../utils/utils";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ErrorMessage from "../ErrorMessage";
import {orDefault} from "../../utils/validationUtils";

export function PasswordEditor() {
    const dispatch = useDispatch();

    const passwordState = useSelector(getPassword);
    const [currentPassword, setCurrentPassword] = React.useState(orDefault(passwordState?.currentPassword, ''));
    const [password, setPassword] = React.useState(orDefault(passwordState?.password, ''));
    const [passwordConfirmation, setPasswordConfirmation] = React.useState(orDefault(passwordState?.passwordConfirmation, ''));

    function onSetPassword(password: string) {
        setPassword(password);
        if (password === passwordConfirmation && currentPassword !== '') {
            dispatch(changePassword(password, passwordConfirmation, currentPassword as string));
        }
    }

    function onSetPasswordConfirmation(confirmation: string) {
        setPasswordConfirmation(confirmation);
        if (password === confirmation && currentPassword !== '') {
            dispatch(changePassword(password, confirmation, currentPassword as string));
        }
    }

    function onSetCurrentPassword(currentPassword: string) {
        setCurrentPassword(currentPassword);
        // if (currentPassword !== '') {
        dispatch(changePassword(password, passwordConfirmation, currentPassword));
        // }
    }

    return (<>
        <DefaultInput label="Текущий пароль" type="password" fullWidth={true} required
                      inputProps={{'data-testid': "current-password-input"}}
                      value={password} onChange={getOnFieldChange(onSetCurrentPassword)}/>
        <Accordion sx={{background: 'none'}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}>
                Смена пароля
            </AccordionSummary>
            <AccordionDetails>
                <DefaultInput label="Новый пароль" type="password" fullWidth={true} required
                              inputProps={{'data-testid': "password-input"}}
                              value={password} onChange={getOnFieldChange(onSetPassword)}/>
                <DefaultInput label="Подтверждение пароля" type="password"
                              fullWidth={true} required inputProps={{'data-testid': "password-confirm-input"}}
                              value={passwordConfirmation} onChange={getOnFieldChange(onSetPasswordConfirmation)}/>
                <ErrorMessage message='Пароль и подтверждение не совпадают'
                              condition={password !== passwordConfirmation}/>
            </AccordionDetails>
        </Accordion>
    </>);
}
