import React from 'react';
// @ts-ignore
import {CredentialProvider} from "react-rbac-guard";
import {useSelector} from "react-redux";
import getCredentials from "../hooks/getCredentials";

export default function AuthProvider({children}: React.PropsWithChildren<any>) {
    const credentials = useSelector(getCredentials);
    return (
        <CredentialProvider value={credentials}>
            {children}
        </CredentialProvider>
    );
}
