import React from 'react';
import {render, screen} from '@testing-library/react';
import {Login} from "../store/state/LoginState";
import {BusinessLogin, ClientLogin} from "../model/users/UserLogin";
import {Role} from "../model/users/Role";
import {ThemeProvider} from "@mui/material";
import theme from "../theme";
// @ts-ignore
import {CredentialProvider} from "react-rbac-guard";
import {Provider} from "react-redux";
import store from "../store/store";
import CenteredPanel from "../components/CenteredPanel";
import {BusinessManager, ClientManager, GuestManager} from "../rbac/managers";

function renderTestPage(credentials?: Login) {
    render(
        <ThemeProvider theme={theme}>
            <CredentialProvider value={credentials}>
                <Provider store={store}>
                    <CenteredPanel>
                        <GuestManager>
                            Hello world!
                        </GuestManager>
                        <BusinessManager>
                            Hello business!
                        </BusinessManager>
                        <ClientManager>
                            Hello client!
                        </ClientManager>
                    </CenteredPanel>
                </Provider>
            </CredentialProvider>
        </ThemeProvider>
    );
}

function testRolledMessage(role: Role, message: RegExp) {
    const login = role === Role.CLIENT ?
        new ClientLogin('name', 'surename') : new BusinessLogin('business', 'nick');
    const credentials = new Login(login, 'accessToken', 'refreshToken');

    renderTestPage(credentials);

    const titleElement = screen.getByText(message);
    expect(titleElement).toBeInTheDocument();
}

describe('Basic render tests', () => {
    test('renders guest greeting', () => {
        renderTestPage(undefined);

        const titleElement = screen.getByText(/Hello world!/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('renders client greeting', () => {
        testRolledMessage(Role.CLIENT, /Hello client!/i)
    });

    test('renders business greeting', () => {
        testRolledMessage(Role.CLUB, /Hello business!/i)
    });
})
