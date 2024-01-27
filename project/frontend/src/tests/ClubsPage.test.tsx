import {fireEvent, screen} from "@testing-library/react";
import React from "react";
import {givenDefaultRender, givenDefaultRenderWithState, mockFetch} from "./testUtils";
import Routes from "../routes/Routes";
import Option from "../model/util/Option";
import Mock = jest.Mock;
import {Store} from "redux";
import State from "../store/State";

const URL_WITH_FILTER = '/api/clubs?city=%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3&totalCount=5&pageSize=5&pageNumber=0&filters=pool';
const URL_WITHOUT_FILTER = '/api/clubs?city=%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3&totalCount=5&pageSize=5&pageNumber=0&filters=';


const fetchResponse = {
    status: 500,
    json: () => Promise.reject('')
};

function checkFetchCalls(param: string, callNumber: number = 1) {
    const fetchCalls = (fetch as unknown as Mock<void, any>).mock.calls;
    console.log(fetchCalls);
    expect(fetchCalls).toHaveLength(callNumber);
    expect(fetchCalls[callNumber - 1][0]).toBe(param);
}

function openFilters() {
    const filtersElement = screen.getByText(/Фильтры/i);
    fireEvent.click(filtersElement);
}

function clickFilter() {
    const filterElement = screen.getByLabelText(/Американский/i);
    fireEvent.click(filterElement);
    const applyButton = screen.getByText(/Подтвердить/i);
    fireEvent.click(applyButton);
}

beforeEach(() => mockFetch(fetchResponse));
describe('Club page tests', () => {
    test('fetch 500 error handling', async () => {
        givenDefaultRender(<Routes/>, '/clubs');
        const titleElement = await screen.findByText(/Ошибка получения списка клубов/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('renders filters from state', () => {
        givenDefaultRenderWithState(<Routes/>, {options: [new Option("pool", "Американский")]}, '/clubs');
        const filtersElement = screen.getByText(/Фильтры/i);
        fireEvent.click(filtersElement);
        const filterElement = screen.getByLabelText(/Американский/i);
        expect(filterElement).toBeChecked();
        const fetchCalls = (fetch as unknown as Mock<void, any>).mock.calls;
        expect(fetchCalls).toHaveLength(1);
        expect(fetchCalls[0][0]).toBe(URL_WITH_FILTER);
    });

    test('renders with empty filters by default', () => {
        givenDefaultRender(<Routes/>, '/clubs');
        thenExpectAPICallWithEmptyFilters();
    });

    test('make api call with checked filters after choice', () => {
        givenDefaultRender(<Routes/>, '/clubs');
        whenFiltersOpenedAndClicked();
        checkFetchCalls(URL_WITH_FILTER, 2);//2
    });

    test('make api call without unchecked filters after choice', () => {
        givenDefaultRender(<Routes/>, '/clubs');
        whenFiltersOpenedAndClicked();
        whenFiltersOpenedAndClicked();
        checkFetchCalls(URL_WITHOUT_FILTER, 3);//3
    });

    test('save filters to state', () => {
        const store = givenDefaultRenderWithState(<Routes/>, {}, '/clubs') as unknown as Store<State>;
        whenFiltersOpenedAndClicked();
        thenExpectFilterInStore("Американский", store);
    });

    function thenExpectFilterInStore(filter: string, store: Store<State>) {
        expect(store.getState().options.find(f => f.title === filter)).not.toBe(undefined);
    }

    function whenFiltersOpenedAndClicked() {
        openFilters();
        clickFilter();
    }

    function thenExpectAPICallWithEmptyFilters() {
        openFilters();
        checkFetchCalls(URL_WITHOUT_FILTER);
    }
});
