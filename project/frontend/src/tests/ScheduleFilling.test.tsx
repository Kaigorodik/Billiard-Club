import {setupServer} from "msw/node";
import {rest} from "msw";
import GenericResponse from "../model/dto/GenericResponse";
import {
    click,
    clickByTestId,
    clubDefaultLogin,
    givenDefaultRender,
    givenDefaultRenderWithState,
    defaultSchedule, enterToField, fetchTimeout, getFieldValue, setCurrentDate
} from "./testUtils";
import {ClubScheduleResponseItem} from "../model/schedule/ClubScheduleResponseItem";
import Routes from "../routes/Routes";
import React from "react";
import {fireEvent, screen} from "@testing-library/react";
import {wait} from "@testing-library/user-event/dist/utils";
import {defaultTablesInfo} from "../model/club/TablesCounts";
import assert from "assert";
import {ClubScheduleItemRequest} from "../model/schedule/ClubScheduleItemRequest";
import {GameVariant} from "../model/util/GameVariant";


jest.setTimeout(180_000);//for debug


const server = setupServer(
    rest.get('/api/schedule', (req, res, ctx) => {
        return res(ctx.json(new GenericResponse<ClubScheduleResponseItem[]>(defaultSchedule)));
    }),
    rest.post('/api/schedule', (req, res, ctx) => {
        return res(ctx.json(new GenericResponse<ClubScheduleResponseItem[]>([...defaultSchedule,
            new ClubScheduleResponseItem('3', setCurrentDate('2022-04-24T23:00:00'), setCurrentDate('2022-04-24T23:30:00'), defaultTablesInfo, [0])
        ])));
    }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


async function whenUpdateExistingScheduleSclice(choseDay: (day: RegExp) => void) {
    const prices = await screen.findAllByText(/Русский: /i);
    fireEvent.click(prices[0])

    const rusPrice = getFieldValue("rus-input");
    expect(rusPrice).toBe('0');
    enterToField("rus-input", 300);
    choseDay(/вторник/i)
    clickByTestId('submitDialog');
}

describe('Schedule page tests', () => {
    let fetchSpy: any;
    test("Get schedule test", async () => {
        givenDefaultRenderWithState(<Routes/>, {login: clubDefaultLogin}, '/profile');
        givenDefaultRender(<Routes/>, '/schedule');
        await wait(fetchTimeout);//allows '/schedule' request finishes

        const prices = await screen.findAllByText(/Русский: /i);
        expect(prices).toHaveLength(2);
    });

    test("Upload schedule test", async () => {
        await givenSchedulePage();
        await whenAddNewScheduleSlice()
            .then(expectNewSliceRendered)
            .then(expectCorrectUploadAPICallMade);
    });

    test("Update schedule test", async () => {//run independently
        await givenSchedulePage()
        await whenUpdateExistingScheduleSclice(choseDay)
            .then(expectCorrectUpdateAPICallMade);
    });

    async function givenSchedulePage() {
        fetchSpy = jest.spyOn(global, 'fetch');
        givenDefaultRenderWithState(<Routes/>, {login: clubDefaultLogin}, '/schedule');
        await wait(1500);//allows '/schedule' request finishes
    }

    async function whenAddNewScheduleSlice() {
        click(/Добавить период работы/i);
        enterToField("start-time-input", '11:00');
        choseDay(/понедельник/i);
        clickByTestId('submitDialog');
        await wait(fetchTimeout);//allows '/schedule' request finishes
    }

    async function expectNewSliceRendered() {
        const prices = await screen.findAllByText(/Пул/i);
        expect(prices).toHaveLength(3);
    }

    function expectCorrectUploadAPICallMade() {
        const uploadRequest: ClubScheduleItemRequest = JSON.parse((fetchSpy.mock).lastCall[1].body);
        console.log(uploadRequest);
        expect(uploadRequest.item.startTime).toBe("11:00");
        expect(uploadRequest.item.endTime).toBe("22:00");
        expect(uploadRequest.daysOfWeek[0]).toBe(0);
    }

    function expectCorrectUpdateAPICallMade() {
        const uploadRequest: ClubScheduleItemRequest = JSON.parse((fetchSpy.mock as any).lastCall[1].body);
        console.log(uploadRequest);
        expect(uploadRequest.item.pricing[GameVariant.Russian]).toBe(300);
        expect(uploadRequest.daysOfWeek).toContain(0);
        expect(uploadRequest.daysOfWeek).toContain(1);
    }

    function choseDay(day: RegExp) {
        click(/Дни недели:/i);
        click(day);
        clickByTestId('submitOptions');
    }
});