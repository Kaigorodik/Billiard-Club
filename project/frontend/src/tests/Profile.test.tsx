import React from 'react';
import {
    click,
    clientDefaultLogin,
    clientDefaultProfile,
    clubDefaultLogin,
    clubDefaultProfile,
    givenDefaultRender,
    givenDefaultRenderWithState,
    enterToField,
    getFieldValue
} from "./testUtils";
import Routes from "../routes/Routes";
import assert from "assert";
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import GenericResponse from "../model/dto/GenericResponse";
import {ClientProfile} from "../model/users/UserProfile";
import {wait} from "@testing-library/user-event/dist/utils";
import {fireEvent, screen} from "@testing-library/react";
import {ClubProfile} from "../model/club/ClubProfile";

jest.setTimeout(180_000);//for debug


const server = setupServer(
    rest.get('/api/profile', (req, res, ctx) => {
        return res(ctx.json(new GenericResponse<ClientProfile>(clientDefaultProfile)));
    }),
    rest.put('/api/profile', (req, res, ctx) => {
        return res(ctx.status(200));
    }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Client profile tests', () => {

    test('Renders downloaded client profile', async () => {
        givenDefaultRenderWithState(<Routes/>, {login: clientDefaultLogin}, '/profile');
        await wait(1500);//allows '/profile' request finishes
        const name = getFieldValue('name-input')
        const email = getFieldValue('email-input')
        const phone = getFieldValue('phone-input')
        expect(name).toBe(clientDefaultProfile.name);
        expect(email).toBe(clientDefaultProfile.email);
        expect(phone).toBe(clientDefaultProfile.phoneNumber);
        const submitButton = await screen.findByTestId('submit-button');
        expect(submitButton).not.toBeEnabled();
    });

    test('Updates field', async () => {
        const spy = jest.spyOn(global, 'fetch');
        givenDefaultRenderWithState(<Routes/>, {login: clientDefaultLogin}, '/profile');
        givenDefaultRender(<Routes/>, '/profile');
        await wait(1500);//allows '/profile' request finishes

        enterToField('name-input', '2');
        enterToField('current-password-input', '1');

        const submitButton = await screen.findByTestId('submit-button');
        expect(submitButton).toBeEnabled();
        fireEvent.click(submitButton);

        const updateRequest = JSON.parse((spy.mock as any).lastCall[1].body);
        expect(updateRequest.name).toBe('2');
        expect(updateRequest.email).toBe("1@1");
        expect(updateRequest.phoneNumber).toBe("1");
        expect(updateRequest.password).toBe("1");
    });

    test('Updates password', async () => {//executes independently
        const spy = jest.spyOn(global, 'fetch');
        givenDefaultRenderWithState(<Routes/>, {login: clientDefaultLogin}, '/profile');
        givenDefaultRender(<Routes/>, '/profile');
        await wait(1500);//allows '/profile' request finishes

        enterToField('password-confirm-input', '2');
        enterToField('password-input', '2');
        enterToField('current-password-input', '1');

        const submitButton = await screen.findByTestId('submit-button');
        expect(submitButton).toBeEnabled();
        fireEvent.click(submitButton);

        const updateRequest = JSON.parse((spy.mock as any).lastCall[1].body);
        expect(updateRequest.password).toBe("1");
        expect(updateRequest.newPassword).toBe("2");
    });
})


describe('Club profile tests', () => {
    test('Updates field', async () => {
        server.use(
            rest.get('/api/profile', (req, res, ctx) => {
                return res(ctx.json(new GenericResponse<ClubProfile>(clubDefaultProfile)));
            }),
        );
        const spy = jest.spyOn(global, 'fetch');
        givenDefaultRenderWithState(<Routes/>, {login: clubDefaultLogin}, '/profile');
        givenDefaultRender(<Routes/>, '/profile');
        await wait(1500);//allows '/profile' request finishes

        enterToField('name-input', '2');
        enterToField('current-password-input', '1');
        enterToField('rus-input', '3');
        enterToField('add-item-input', 'b');
        click(/Добавить/i)

        const submitButton = await screen.findByTestId('submit-button');
        expect(submitButton).toBeEnabled();
        fireEvent.click(submitButton);
        const updateRequest = JSON.parse((spy.mock as any).lastCall[1].body);
        console.log(updateRequest);
        assert(updateRequest.title === '2');
        assert(updateRequest.email === "1@1");
        assert(updateRequest.phoneNumber === "1");
        assert(updateRequest.password === "1");
        assert(updateRequest.additionalServices[0] === 'a');
        assert(updateRequest.additionalServices[1] === 'b');
        assert(updateRequest.inventory.russian === 3);
    });
});
