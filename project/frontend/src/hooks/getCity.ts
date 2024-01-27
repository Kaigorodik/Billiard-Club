import {createSelector} from "reselect";
import State from "../store/State";


export default createSelector(
    ({city}: State) => city,
    state => state
);
