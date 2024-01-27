import React from 'react';
import {render, screen} from '@testing-library/react';
import Routes from "../routes/Routes";
import {Provider} from "react-redux";
import store from "../store/store";
import {MemoryRouter} from "react-router-dom";
import theme from "../theme";
import {ThemeProvider} from "@mui/material";
import {givenDefaultRender} from "./testUtils";

describe('Basic render tests', () => {
    test('renders greeting', () => {
        givenDefaultRender(<Routes/>, '/');
        const titleElement = screen.getAllByText(/Billiard Club/i)
            .filter(e => e instanceof  HTMLAnchorElement)[0];
        expect(titleElement).toBeInTheDocument();
    });

    test('renders header', () => {
        givenDefaultRender(<Routes/>, '/');
        const headerElement = screen.getAllByText(/Billiard Club/i)
            .filter(e => !(e instanceof  HTMLAnchorElement))[0];
        expect(headerElement).toBeInTheDocument();
    });

    test('renders login', () => {
        render(
            <ThemeProvider theme={theme}>
                <MemoryRouter initialEntries={['/authentication']}>
                    <Provider store={store}>
                        <Routes/>
                    </Provider>
                </MemoryRouter>
            </ThemeProvider>
        );
        const titleElement = screen.getAllByText(/Вход/i)[0];
        expect(titleElement).toBeInTheDocument();
    });
})
