import {fireEvent, render, screen} from "@testing-library/react";
import {ThemeProvider} from "@mui/material";
import theme from "../theme";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import Routes from "../routes/Routes";
import React from "react";
import AuthProvider from "../rbac/AuthProvider";
import {createStore} from "redux";
import reducer from "../store/Reducer";
import {ClientProfile} from "../model/users/UserProfile";
import {Login} from "../store/state/LoginState";
import {UserLogin} from "../model/users/UserLogin";
import {Role} from "../model/users/Role";
import {ClubProfile} from "../model/club/ClubProfile";
import {Cities} from "../model/util/Cities";
import {defaultTablesInfo} from "../model/club/TablesCounts";
import {ClubScheduleResponseItem} from "../model/schedule/ClubScheduleResponseItem";
import {Booking, ClubLink} from "../model/bookings/Booking";
import {GameVariant} from "../model/util/GameVariant";
import {FullBookingSlot} from "../model/bookings/FullBookingSlot";

export function givenDefaultRender(componentToRender: React.ReactNode, ...paths: string[]) {
    return givenDefaultRenderWithState(componentToRender, undefined, ...paths);
}

export function givenDefaultRenderWithState(componentToRender: React.ReactNode, preloadedState: any, ...paths: string[]) {
    const store = createStore(reducer, preloadedState);
    render(
        <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={paths}>
                <Provider store={store}>
                    <AuthProvider>
                        {componentToRender}
                    </AuthProvider>
                </Provider>
            </MemoryRouter>
        </ThemeProvider>
    );
    return store;
}

const renderAuth = givenDefaultRender.bind(null, <Routes/>, '/authentication');

export function signin(login: string, password: string) {
    renderAuth();

    const loginInput: HTMLInputElement = screen.getByTestId('login-input');
    fireEvent.change(loginInput, {target: {value: login}});

    const passwordInput: HTMLInputElement = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, {target: {value: password}});

    const submitButton: HTMLButtonElement = screen.getByTestId('submit');
    fireEvent.click(submitButton);
}

export function moveToIndex() {
    const indexLink = screen.getByTestId('index-link');
    fireEvent.click(indexLink);
    window.location.href = '/';
}

export function mockFetch(result: object) {
    // @ts-ignore
    global.fetch = jest.fn(() =>
        Promise.resolve(result)
    );
}

export function enterToField(fieldId: string, value: any) {
    const input: HTMLInputElement = screen.getByTestId(fieldId);
    fireEvent.change(input, {target: {value: value}});
}

export function click(elementText: RegExp) {
    const element = screen.getByText(elementText);
    fireEvent.click(element);
}

export function clickByTestId(elementId: string) {
    const element = screen.getByTestId(elementId);
    fireEvent.click(element);
}

export function getFieldValue(fieldId: string) {
    const input: HTMLInputElement = screen.getByTestId(fieldId);
    return input.value;
}

const clientDefaultProfile = new ClientProfile("1@1", "1", "1");
const clientDefaultLogin = new Login(new UserLogin('1@1', '1', Role.CLIENT), '', '');

const clubDefaultProfile = new ClubProfile("1@1", "1", "club", "", "a", Cities.Ekb, [], defaultTablesInfo, ['a']);
const clubDefaultLogin = new Login(new UserLogin('1@1', '1', Role.CLUB), '', '');

export function setCurrentDate(date: string) {
    const d = new Date(date);
    const currentDate = new Date();
    d.setDate(currentDate.getDate())
    d.setMonth(currentDate.getMonth());
    return d.toISOString(); //break timezone
}

const defaultSchedule = [
    new ClubScheduleResponseItem('1', setCurrentDate('2022-04-24T10:00:00'), setCurrentDate('2022-04-24T18:00:00'), defaultTablesInfo, [0]),
    new ClubScheduleResponseItem('2', setCurrentDate('2022-04-24T18:00:00'), setCurrentDate('2022-04-24T23:00:00'), defaultTablesInfo, [0])
];

const today = new Date().toISOString().substring(0, 10);

const defaultFullness = [
    new FullBookingSlot(setCurrentDate('2022-05-10T09:00:00'), setCurrentDate('2022-05-10T10:00:00'), 'Нерабочее время', '#AAAAAA'),
    new FullBookingSlot(setCurrentDate('2022-05-10T10:00:00'), setCurrentDate('2022-05-10T22:00:00'), 'Есть свободные места', '#83baff'),
    new FullBookingSlot(setCurrentDate('2022-05-10T22:00:00'), setCurrentDate('2022-05-10T23:59:59'), 'Нерабочее время', '#AAAAAA')
];

const defaultBookings: Booking[] = [
    {
        id: '1',
        startTime: '10:00',
        endTime: '12:00',
        variant: GameVariant.Russian,
        user: new ClientProfile('email@', 'vovan', '+78888888888'),
        date: today,
        club: new ClubLink('1', 'Best club'),
        count: 2
    },
    {
        id: '2',
        startTime: '10:00',
        endTime: '12:00',
        variant: GameVariant.Pool,
        user: new ClientProfile('JZ@', 'XXX', '+7'),
        club: new ClubLink('2', 'New club'),
        date: today,
        count: 1
    },
];

const fetchTimeout = 1500;

export {today, defaultFullness, fetchTimeout, defaultSchedule, clientDefaultProfile, clientDefaultLogin, clubDefaultProfile, clubDefaultLogin, defaultBookings};