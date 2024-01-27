import React from 'react';
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Role} from "../model/users/Role";
import CenteredPanel from "../components/CenteredPanel";
import {useDispatch, useSelector} from "react-redux";
import {useWarn} from "../hooks/logging";
import {register} from "../api/auth";
import {setLoginAction} from "../store/slices/AuthSlice";
import {LoginState} from "../store/state/LoginState";
import getPassword from "../hooks/getPassword";
import {ClientProfile} from "../model/users/UserProfile";
import {ClubProfile} from "../model/club/ClubProfile";
import {useParams} from "react-router-dom";
import {RegisterLabels} from "../model/props/ProfileSubmitProps";
import ClientProfileEditor from "./profile/ClientProfileEditor";
import {ClubProfileEditor} from "./profile/ClubProfile/ClubProfileEditor";

export default function Register() {
    const {type} = useParams();

    function setType(value: Role) {
        window.location.href = `/registration/${value}`;
    }

    const handleChange = (event: React.SyntheticEvent, newValue: Role) => setType(newValue);

    const dispatch = useDispatch();
    const warn = useWarn();

    const password = useSelector(getPassword);
    const onRegister = (profile: ClientProfile | ClubProfile) =>
        register(profile, password?.password as string).then(r => {
            if (r !== null) {
                dispatch(setLoginAction(r as LoginState));
                window.location.href = '/';
            }
        }).catch(e => {
            warn(e.toString());
        });

    return (
        <CenteredPanel style={{width: '450px'}}>
            <TabContext value={type ? (type as string) : Role.CLIENT}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Клиент" value={Role.CLIENT}/>
                        <Tab label="Бизнес" value={Role.CLUB}/>
                    </TabList>
                </Box>
                <TabPanel value={Role.CLIENT}><ClientProfileEditor labels={RegisterLabels} onSubmit={onRegister}/></TabPanel>
                <TabPanel value={Role.CLUB}><ClubProfileEditor labels={RegisterLabels} onSubmit={onRegister}/></TabPanel>
            </TabContext>
        </CenteredPanel>
    );
}

