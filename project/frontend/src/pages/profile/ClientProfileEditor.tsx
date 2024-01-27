import {ClientProfile} from "../../model/users/UserProfile";
import {useDispatch, useSelector} from "react-redux";
import getPassword from "../../hooks/getPassword";
import React from "react";
import {getOnFieldChange} from "../../utils/utils";
import Title from "../../components/Title";
import {Button, CssBaseline} from "@mui/material";
import DefaultInput from "../../components/DefaultInput";
import PasswordEdit from "../../components/passwordEdit/PasswordEdit";
import ErrorMessage from "../../components/ErrorMessage";
import {ProfileProps} from "../../model/props/ProfileSubmitProps";
import getProfile from "../../hooks/getProfile";
import {setProfile} from "../../store/actions/profile";
import {PasswordEditVariants} from "../../model/util/PasswordEditVariants";
import {allNotEmpty, orDefault} from "../../utils/validationUtils";

export default function ClientProfileEditor({onSubmit, passwordVariant = PasswordEditVariants.SetRegisterPassword, labels}: ProfileProps) {
    const dispatch = useDispatch();

    const password = useSelector(getPassword);
    const clientProfile = orDefault(useSelector(getProfile), new ClientProfile()) as ClientProfile;

    function getOnProfilePropertyChanged(property: (p: string) => ClientProfile) {//TODO: move with* methods to actions and reducer
        return getOnFieldChange((v: string) => dispatch(setProfile(property(v))));
    }

    const allFilledAndCorrect = allNotEmpty(clientProfile.email, clientProfile.name, clientProfile.phoneNumber)
        && password?.isFilledCorrectly(passwordVariant as PasswordEditVariants);
    console.log(`Updated profile is fully filled: ${allFilledAndCorrect}`)

    return (<>
        <Title title={`${labels.titleLabel} клиента`}/>
        <CssBaseline/>
        <DefaultInput required label="Имя (как к вам обращаться)" inputProps={{'data-testid': "name-input"}} value={clientProfile.name}
                      onChange={getOnProfilePropertyChanged(n => clientProfile.withName(n))} fullWidth={true}/>
        <CssBaseline/>
        <DefaultInput required label="Электронная почта" type="email" inputProps={{'data-testid': "email-input"}} value={clientProfile.email}
                      onChange={getOnProfilePropertyChanged(e => clientProfile.withEmail(e))} fullWidth={true}/>
        <CssBaseline/>
        <DefaultInput label="Номер телефона" required inputProps={{'data-testid': "phone-input", inputMode: 'numeric'}} value={clientProfile.phoneNumber}
                      onChange={getOnProfilePropertyChanged(e => clientProfile.withPhone(e))} fullWidth={true}/>
        <CssBaseline/>{/*TODO: check format*/}
        <PasswordEdit passwordVariant={passwordVariant}/>
        <ErrorMessage message='Не все обязательные поля заполнены' condition={!allFilledAndCorrect}/>
        <CssBaseline/>
        <Button data-testid='submit-button' disabled={!allFilledAndCorrect} color='inherit' onClick={() => onSubmit(clientProfile)}>
            {labels.submitLabel}
        </Button>
    </>);
}
