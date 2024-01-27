
import Action from "../Action";
import {ActionType} from "../ActionType";
import {OptionsState} from "../state/OptionsState";
import Option from "../../model/util/Option";

export function setOptions(activeFilters: Option[]): Action<OptionsState> {
    return {
        type: ActionType.SetOptions,
        payload: activeFilters
    };
}

export function clearOptions(): Action<OptionsState> {
    return setOptions([]);
}
