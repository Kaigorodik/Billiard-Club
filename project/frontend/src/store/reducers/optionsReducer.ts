import {OptionsState, initState} from "../state/OptionsState";
import Action from "../Action";
import {ActionType} from "../ActionType";

export default function optionsReducer(state = initState, action: Action<OptionsState>) {
    switch (action.type) {
        case ActionType.SetOptions:
            return action.payload;
        default:
            return state;
    }
}
