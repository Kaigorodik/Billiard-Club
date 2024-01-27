import React from 'react';
import {screen, fireEvent} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {Login} from "../store/state/LoginState";
import {BusinessLogin, ClientLogin} from "../model/users/UserLogin";
import {login} from "../api/auth";
import GenericResponse from "../model/dto/GenericResponse";
import {signin} from "./testUtils";

const server = setupServer(
    rest.post('/api/auth/signin', (req, res, ctx) => {
        return res(ctx.json(new GenericResponse<Login>(new Login(new ClientLogin('email', 'name'), 'accessToken', 'refreshToken'))));
    }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe('Auth tests', () => {
    test('login function test', async () => {
        const credentials = await login('1', '1');
        expect((credentials.user as ClientLogin).name).toEqual('name');
    });

    test('renders username after successful login', async () => {
        signin('1', '1')

        const usernameHeader = await screen.findByText(/name/i);
        expect(usernameHeader).toBeInTheDocument();
    });

    test('renders business title after successful login', async () => {
        server.use(
            rest.post('/api/auth/signin', (req, res, ctx) => {
                return res(ctx.json(new GenericResponse<Login>(new Login(new BusinessLogin('email', 'business'), 'accessToken', 'refreshToken'))));
            })
        );

        signin('1', '1')

        const usernameHeader = await screen.findByText(/business/i);
        expect(usernameHeader).toBeInTheDocument();
    });

    test('does not render username after logout', async () => {
        signin('1', '1')

        const logoutButton = await screen.findByTestId("logout-button");
        expect(logoutButton).toBeInTheDocument();
        fireEvent.click(logoutButton);
        expect(logoutButton).not.toBeInTheDocument();
    });

    test('renders error message', async () => {
        server.use(rest.post('/api/auth/signin', (req, res, ctx) => {
            return res.once(ctx.status(500), ctx.json({message: "Test error"}));
        }));

        signin('1', '1')

        const errorMessage = await screen.findByText(/Test error/i);
        expect(errorMessage).toBeInTheDocument();
    });
})
