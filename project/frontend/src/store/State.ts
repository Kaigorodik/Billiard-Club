import {CityState} from "./state/CityState";
import LogState from "./state/LogState";
import {LoginState} from "./state/LoginState";
import {OptionsState} from "./state/OptionsState";
import PagingState from "./state/PagingState";
import {PasswordState} from "./state/PasswordState";
import {ProfileState} from "./state/ProfileState";

export default interface State {
    log: LogState
    city: CityState
    login: LoginState
    options: OptionsState
    paging: PagingState
    password: PasswordState
    profile: ProfileState
}
