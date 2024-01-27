import React from 'react';
import {fireEvent, screen} from '@testing-library/react';
import {click, clickByTestId, givenDefaultRender, enterToField, mockFetch} from "./testUtils";
import Routes from "../routes/Routes";
import Mock = jest.Mock;
import {ClubProfile} from "../model/club/ClubProfile";


const fetchResponse = {
    status: 200,
    json: () => Promise.resolve('')
};

describe('Register tests', () => {
    describe('Client register tests', () => {
        test('Prints confirmation message', async () => {
            givenDefaultRender(<Routes/>, '/registration');
            enterToField('password-confirm-input', '1');

            const errorMessage = await screen.findByText(/Пароль и подтверждение не совпадают/i);
            expect(errorMessage).toBeInTheDocument();
        });


        test('Client registration creates correct request', async () => {
            mockFetch(fetchResponse);
            givenDefaultRender(<Routes/>, '/registration');
            const errorMessage = await screen.findByText(/Не все обязательные поля заполнены/i);
            expect(errorMessage).toBeInTheDocument();
            enterToField('name-input', '1');
            enterToField('email-input', '1');
            enterToField('phone-input', '1');
            enterToField('password-confirm-input', '1');
            enterToField('password-input', '1');

            const submitButton = await screen.findByTestId('submit-button');
            expect(submitButton).toBeEnabled();
            fireEvent.click(submitButton);

            const fetchCalls = (fetch as unknown as Mock<void, any>).mock.calls;
            const registerCall = fetchCalls[0];
            expect(registerCall[0]).toBe('/api/auth/signup/client');
            expect(registerCall[1].method).toBe('POST');
            const requestBody = JSON.parse(registerCall[1].body);
            expect(requestBody.email).toBe('1');
            expect(requestBody.phoneNumber).toBe('1');
            expect(requestBody.name).toBe('1');
            expect(requestBody.password).toBe('1');
        });
    });

    describe('Club register test', () => {
        test('Editable list should add and remove item', async () => {
            // eslint-disable-next-line testing-library/render-result-naming-convention
            const store = givenDefaultRender(<Routes/>, '/registration/club');
            // moveToClubVariant();
            enterToField('add-item-input', 'Test Item');
            click(/Добавить/i)
            const itemElement = screen.getByText(/Test Item/i);
            expect(itemElement).toBeInTheDocument();//item added successfully
            expect((store.getState().profile as ClubProfile).additionalServices[0]).toBe('Test Item'); //item presents in state
            clickByTestId('remove-item');

            const itemElement2 = screen.queryByText(/Test Item/i);
            expect(itemElement2).not.toBeInTheDocument();//item removed successfully
        });


        test('Club registration creates correct request', async () => {
            mockFetch(fetchResponse);
            givenDefaultRender(<Routes/>, '/registration/club');
            const errorMessage = await screen.findByText(/Не все обязательные поля заполнены/i);
            expect(errorMessage).toBeInTheDocument();
            enterToField('password-confirm-input', '1');
            enterToField('password-input', '1');
            enterToField('name-input', 't');
            enterToField('email-input', 'e');
            enterToField('phone-input', '1');
            enterToField('address-input', 'a');
            enterToField('rus-input', '3');
            enterToField('add-item-input', 'Test Item');
            click(/Добавить/i)

            const submitButton = await screen.findByTestId('submit-button');
            expect(submitButton).toBeEnabled();
            fireEvent.click(submitButton);

            const fetchCalls = (fetch as unknown as Mock<void, any>).mock.calls;
            const registerCall = fetchCalls[0];
            expect(registerCall[0]).toBe('/api/auth/signup/club');
            expect(registerCall[1].method).toBe('POST');
            const requestBody = JSON.parse(registerCall[1].body);
            console.log(requestBody);
            expect(requestBody.email).toBe('e');
            expect(requestBody.phoneNumber).toBe('1');
            expect(requestBody.title).toBe('t');
            expect(requestBody.password).toBe('1');
            expect(requestBody.address).toBe('a');
            expect(requestBody.inventory.russian).toBe(3);
            expect(requestBody.additionalServices[0]).toBe('Test Item');
        });
    });
})
