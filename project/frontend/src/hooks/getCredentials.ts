import { createSelector } from 'reselect';
import State from "../store/State";


export default createSelector(
    (state: State) => {
        return state.login;
    },
    login => login
);
