import {setupServer} from "msw/node";
import {rest} from "msw";
import GenericResponse from "../model/dto/GenericResponse";
import {
    click,
    clickByTestId,
    clubDefaultLogin,
    defaultBookings,
    givenDefaultRenderWithState,
    enterToField, fetchTimeout, today
} from "./testUtils";
import Routes from "../routes/Routes";
import React from "react";
import {screen} from "@testing-library/react";
import {wait} from "@testing-library/user-event/dist/utils";
import {GameVariant} from "../model/util/GameVariant";
import {Booking} from "../model/bookings/Booking";
import {ClientProfile} from "../model/users/UserProfile";


jest.setTimeout(180_000);//for debug

const startTimeDef = '11:30';
const endTimeDef = '12:30'
const userNameDef = 'Test user';
const userPhoneDef = '777';
const dateDef = '2022-04-20';

const server = setupServer(
    rest.get('/api/bookings', (req, res, ctx) => {
        return res(ctx.json(new GenericResponse<Booking[]>(defaultBookings)));
    }),
    rest.post('/api/bookings', (req, res, ctx) => {
        return res(ctx.json(new GenericResponse<Booking[]>([...defaultBookings,
            {id: '3', startTime: startTimeDef, endTime: endTimeDef, count: 1, date: today, variant: GameVariant.Russian, user: new ClientProfile('', userNameDef, userPhoneDef)}
        ])));
    }),
    rest.put('/api/bookings', (req, res, ctx) => {
        const newBookings = [...defaultBookings];
        newBookings[0].endTime = '13:00';
        return res(ctx.json(new GenericResponse<Booking[]>(newBookings)));
    }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe('Club booking page tests', () => {
    test("Get bookings test", async () => {
        givenDefaultRenderWithState(<Routes/>, {login: clubDefaultLogin}, '/admin');
        await wait(fetchTimeout);//allows '/schedule' request finishes

        const bookings = await screen.findAllByText(/10:00/i);
        expect(bookings).toHaveLength(3);// the first two are bookings, and the third one is in calendar
    });

    test("Add booking test", async () => {
        const spy = jest.spyOn(global, 'fetch');
        givenDefaultRenderWithState(<Routes/>, {login: clubDefaultLogin}, '/admin');
        await wait(fetchTimeout);//allows '/schedule' request finishes
        click(/Добавить бронь/i);
        enterToField("start-time-input", startTimeDef);
        enterToField("end-time-input", endTimeDef);
        enterToField("date-input", dateDef);
        enterToField("name-input", userNameDef);
        enterToField("phone-input", userPhoneDef);
        clickByTestId('submitDialog');
        await wait(fetchTimeout);//allows '/schedule' request finishes
        const newBooking = await screen.findByText(/11:30/i);
        expect(newBooking).toBeInTheDocument();//TODO: add more checks
        const query = (spy.mock as any).lastCall[0];
        const booking: Booking = JSON.parse((spy.mock as any).lastCall[1].body);
        // expect(query).toContain('date=2022');
        expect(query).not.toContain('clubId');
        expect(booking.startTime).toBe(startTimeDef);
        expect(booking.endTime).toBe(endTimeDef);
        expect(booking.date).toBe(dateDef);
        expect(booking.user?.name).toBe(userNameDef);
        expect(booking.user?.phoneNumber).toBe(userPhoneDef);
    });

    // test("Update booking test", async () => {//run independently
    //     const spy = jest.spyOn(global, 'fetch');
    //     defaultRenderWithState(<Routes/>, {login: clubDefaultLogin}, '/admin');
    //     await wait(fetchTimeout);//allows '/schedule' request finishes
    //     // clickByTestId('edit-booking');
    //     const bookings = await screen.findAllByPlaceholderText('edit'); //findAllByTestId('edit-booking');
    //     fireEvent.click(bookings[0]);
    //     enterToField("end-time-input", '13:00');
    //     clickByTestId('submitDialog');
    //     await wait(fetchTimeout);//allows '/schedule' request finishes
    //     const newBooking = await screen.findByText(/13:00/i);
    //     expect(newBooking).toBeInTheDocument();//TODO: add more checks
    //     const query = (spy.mock as any).lastCall[0];
    //     const booking: Booking = JSON.parse((spy.mock as any).lastCall[1].body);
    //     // expect(query).toContain('date=2022');
    //     expect(query).not.toContain('clubId');
    //     expect(booking.startTime).toBe(startTimeDef);
    //     expect(booking.endTime).toBe(endTimeDef);
    //     expect(booking.user?.name).toBe(userNameDef);
    //     expect(booking.user?.phoneNumber).toBe(userPhoneDef);
    // });
});
