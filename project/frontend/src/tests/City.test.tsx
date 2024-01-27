import {screen} from "@testing-library/react";
import React from "react";
import {givenDefaultRenderWithState} from "./testUtils";
import Routes from "../routes/Routes";
import {Cities} from "../model/util/Cities";

describe('City handling', () => {
    test('renders from store', () => {
        givenDefaultRenderWithState(<Routes/>, {city: Cities.Orsk}, '/');
        const cityElement = screen.getByText(/Орск/i);
        expect(cityElement).toBeInTheDocument();
    });

    // test('selects city', async () => {
    //     // persist(Cities.Orsk);
    //     defaultRender(<Routes/>, '/');
    //     const cityChoiceElement = screen.getByDisplayValue(/Екатеринбург/i);//getByText(/Екатеринбург/i);
    //     fireEvent.click(cityChoiceElement); //click on dropdown
    //     cityChoiceElement.click();
    //     const itemElement = await screen.findByText(/Орск/i);
    //     fireEvent.click(itemElement); //choose option
    //     const selectedCityElement = await screen.findByText(/Орск/i);
    //     expect(selectedCityElement).toBeInTheDocument();
    //     assert(restore() === Cities.Orsk); //selection persisted
    //     // const anotherCityElement = screen.getByText(/Екатеринбург/i);
    // });
});
