import React, {useState} from 'react';
import {Button, CssBaseline} from "@mui/material";
import {getOnFieldChange} from "../utils/utils";
import {LoginState} from "../store/state/LoginState";
import {setLoginAction} from "../store/slices/AuthSlice";
import {useDispatch} from "react-redux";
import {useWarn} from "../hooks/logging";
import {login} from "../api/auth";
import CenteredPanel from "../components/CenteredPanel";
import Title from "../components/Title";
import DefaultInput from "../components/DefaultInput";
import {allNotEmpty} from "../utils/validationUtils";


export default function Login() {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const warn = useWarn();

    const onLogin = () => login(email, password).then(r => {
        if (r !== null) {
            dispatch(setLoginAction(r as LoginState));
            window.location.href = '/';
        }
    }).catch(e => {
        warn(e.toString());
    });

    const allFilled = allNotEmpty(email, password);
    console.log(`Email: ${email}`)
    return (
        <CenteredPanel style={{width: '450px'}}>
            <Title title="Вход"/>
            <CssBaseline/>
            <DefaultInput inputProps={{'data-testid': "login-input"}} required label="Электронная почта"
                          onChange={getOnFieldChange(setEmail)} fullWidth={true} value={email}/>
            <CssBaseline/>
            <DefaultInput inputProps={{'data-testid': "password-input"}} label="Пароль" required value={password}
                          onChange={getOnFieldChange(setPassword)} type="password" fullWidth={true}/>
            <CssBaseline/>
            <Button href='/registration' color='inherit'>Зарегистрироваться</Button>
            <Button data-testid="submit" disabled={!allFilled} color='inherit' onClick={onLogin}>Войти</Button>
        </CenteredPanel>
    );
}

