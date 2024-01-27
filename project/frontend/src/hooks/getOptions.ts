import {createSelector} from "reselect";
import State from "../store/State";

export default createSelector(
    ({options}: State) => options,
    options => options
);
