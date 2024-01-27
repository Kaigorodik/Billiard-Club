import {Booking} from "../model/bookings/Booking";
import {getDefaultDownloadHandler, getQueryString, getTokenHeader} from "../utils/fetchUtils";
import GenericResponse from "../model/dto/GenericResponse";
import {GameVariant} from "../model/util/GameVariant";
import {FullBookingSlot} from "../model/bookings/FullBookingSlot";

/**
 *
 * @param date in format “yyyy-mm-dd“
 */
export function getBookings(date: string) {
    return fetch('/api/bookings?' + getQueryString({date}), {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler('Ошибка получения броней'))
        .then((r: GenericResponse<Booking[]>) => r.data);
}

/**
 * Add booking by client.
 * @param booking
 * @param date in format “yyyy-mm-dd“
 * @param clubId is required for clients and redundant for clubs
 */
export function addBookingClient(booking: Booking, clubId?: string) {
    return fetch('/api/bookings/client?' + getQueryString({clubId}), {
        headers: getTokenHeader(),
        method: 'POST',
        body: JSON.stringify(booking)
    }).then(getDefaultDownloadHandler('Ошибка получения броней'))
        .then((r: GenericResponse<Booking[]>) => r.data);
}

/**
 * Add booking by admin.
 * @param booking
 * @param date in format “yyyy-mm-dd“
 * @param clubId is required for clients and redundant for clubs
 */
export function addBookingAdmin(booking: Booking) {
    return fetch('/api/bookings/club', {
        headers: getTokenHeader(),
        method: 'POST',
        body: JSON.stringify(booking)
    }).then(getDefaultDownloadHandler('Ошибка получения броней'))
        .then((r: GenericResponse<Booking[]>) => r.data);
}

export function editBooking(booking: Booking) {
    return fetch('/api/bookings', {
        headers: getTokenHeader(),
        method: 'PUT',
        body: JSON.stringify(booking)
    }).then(getDefaultDownloadHandler('Ошибка получения броней'))
        .then((r: GenericResponse<Booking[]>) => r.data);
}

/**
 *
 * @param id - booking id
 */
export function deleteBooking(id: string) {
    return fetch('/api/bookings?' + getQueryString({id}), {
        headers: getTokenHeader(),
        method: 'DELETE'
    }).then(getDefaultDownloadHandler('Ошибка получения броней'))
        .then((r: GenericResponse<Booking[]>) => r.data);
}

/**
 *
 * @param date in format “yyyy-mm-dd“
 * @param gameVariant
 */
export function getFullFilledSlices(date: string, gameVariant: GameVariant) {
    return fetch('/api/bookings-full?' + getQueryString({gameVariant, date}), {
        headers: getTokenHeader(),
    }).then(getDefaultDownloadHandler('Ошибка получения заполненности'))
        .then((r: GenericResponse<FullBookingSlot[]>) => r.data);
}


export function getMyBookings() {
    return fetch('/api/my-bookings', {
        headers: getTokenHeader(),
    }).then(getDefaultDownloadHandler('Ошибка получения броней'))
        .then((r: GenericResponse<Booking[]>) => r.data);
}