import {Cities} from "../../model/util/Cities";
import {StorageKeys} from "../../utils/StorageKeys";

export type CityState = Cities;

export function persist(city: Cities) {
    localStorage.setItem(StorageKeys.City, city);
}

export function restore() {
    return localStorage.getItem(StorageKeys.City) !== null ?
        (localStorage.getItem(StorageKeys.City) as Cities) : Cities.Ekb;
}

const initState = restore();

export {initState};
