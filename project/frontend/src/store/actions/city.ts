import {Cities} from "../../model/util/Cities";
import Action from "../Action";
import {ActionType} from "../ActionType";

export function setCity(city: Cities): Action<Cities> {
    return {
        payload: city,
        type: ActionType.SetCity
    };
}
