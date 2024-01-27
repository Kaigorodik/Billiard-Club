import {initState, persist} from "../state/CityState";
import Action from "../Action";
import {Cities} from "../../model/util/Cities";
import {ActionType} from "../ActionType";

export default function cityReducer(state = initState, action: Action<Cities>) {
    switch (action.type) {
        case ActionType.SetCity:
            persist(action.payload);
            return action.payload;
        default:
            return state;
    }
}
