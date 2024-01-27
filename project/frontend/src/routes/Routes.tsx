import React from 'react';
import {Route, Routes} from 'react-router-dom';
import StartPage from "../pages/StartPage";
import BaseLayout from "../components/layout/BaseLayout";
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoutes from "./PrivateRoutes";
import {NoMatch} from "../pages/NoMatch";
import {ClubsPage} from "../pages/clubs/ClubsPage";
import ClubDetailedPage from "../pages/club/ClubDetailedPage";
import {AdminPage} from "../pages/admin/AdminPage";
import ClubsMapPage from "../pages/clubs/ClubsMapPage";
import ProfilePage from "../pages/profile/ProfilePage";
import ScheduleFillingPage from "../pages/schedule/ScheduleFillingPage";
import {Role} from "../model/users/Role";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
    return (
        <>
            <Routes>
                <Route element={<BaseLayout/>} path='/'>
                    <Route element={<StartPage/>} index/>
                    <Route element={<Login/>} path='authentication'/>
                    <Route element={<Register/>} path='registration'/>
                    <Route element={<Register/>} path='registration/:type'/>
                    <Route element={<ClubsPage/>} path='clubs'/>
                    <Route element={<ClubsMapPage/>} path='clubs_map'/>
                    <Route element={<ClubDetailedPage/>} path='club'/>
                    <Route element={<NoMatch/>} path='*'/>

                    {/*TODO: move to private*/}
                    <Route element={<AdminPage/>} path='admin'/>
                    <Route element={<ProfilePage/>} path='profile'/>
                    <Route element={<ScheduleFillingPage/>} path='schedule'/>
                </Route>
            </Routes>
            <PrivateRoutes>
                {/*TODO: uncomment*/}
                {/*<Route element={<AdminPage/>} path='admin'/>*/}
                {/*<Route element={<ProfilePage/>} path='profile'/>*/}
            </PrivateRoutes>
            <PrivateRoutes requiredRole={Role.CLUB}>
                {/*TODO: uncomment*/}
                {/*<Route element={<ScheduleFillingPage/>} path='schedule'/>*/}
            </PrivateRoutes>
        </>
    );
}

