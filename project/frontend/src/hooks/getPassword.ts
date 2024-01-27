import {createSelector} from "reselect";
import State from "../store/State";

export default createSelector(
    ({password}: State) => password,
    state => state
);
