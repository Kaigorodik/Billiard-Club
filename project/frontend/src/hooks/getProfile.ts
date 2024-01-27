import {createSelector} from "reselect";
import State from "../store/State";

/**TODO: unite all selectors in one file*/
export default createSelector(
    ({profile}: State) => profile,
    state => state
);
