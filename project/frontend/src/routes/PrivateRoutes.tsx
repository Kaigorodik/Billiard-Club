import {Role} from "../model/users/Role";
import {useSelector} from "react-redux";
import getCredentials from "../hooks/getCredentials";
import {Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import BaseLayout from "../components/layout/BaseLayout";

interface PrivateRouteProps {
    requiredRole?: Role
    defaultPath?: string
}

export default function PrivateRoutes({requiredRole = undefined, children, defaultPath = "/authentication"}: React.PropsWithChildren<PrivateRouteProps>) {
    const login = useSelector(getCredentials);
    const authorisedAndNotRequireRole = !requiredRole && login;
    const satisfyRoleRequirement = login?.user.role === requiredRole;
    return (<Routes>
        {((authorisedAndNotRequireRole || satisfyRoleRequirement) &&
            <Route element={<BaseLayout/>}>
                {children}
            </Route>) || <Route element={<Navigate to={defaultPath}/>}/>}
    </Routes>)
}
