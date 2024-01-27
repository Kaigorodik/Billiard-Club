import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import Routes from './routes/Routes';
import reportWebVitals from './reportWebVitals';
import store from "./store/store";
import {BrowserRouter} from "react-router-dom";
import theme from "./theme";
import {ThemeProvider} from "@mui/material";
import AuthProvider from "./rbac/AuthProvider";

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <AuthProvider>
                        <Routes/>
                    </AuthProvider>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
