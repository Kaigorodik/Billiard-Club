import {createSelector} from "reselect";
import State from "../store/State";

export default createSelector(
    ({paging}: State) => paging,
    state => state
);
