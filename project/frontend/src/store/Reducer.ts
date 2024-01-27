import {combineReducers} from "redux";
import authReducer from "./slices/AuthSlice";
import logReducer from "./reducers/logReducer";
import pagingReducer from "./reducers/pagingReducer";
import cityReducer from "./reducers/cityReducer";
import optionsReducer from "./reducers/optionsReducer";
import passwordReducer from "./reducers/passwordReducer";
import profileReducer from "./reducers/profileReducer";

export default combineReducers({
    login: authReducer,
    log: logReducer,
    paging: pagingReducer,
    city: cityReducer,
    options: optionsReducer,
    password: passwordReducer,
    profile: profileReducer
});
