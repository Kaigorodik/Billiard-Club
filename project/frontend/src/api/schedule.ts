import {ClubScheduleResponseItem} from "../model/schedule/ClubScheduleResponseItem";
import {ClubScheduleItemRequest} from "../model/schedule/ClubScheduleItemRequest";
import {getDefaultDownloadHandler, getTokenHeader} from "../utils/fetchUtils";
import GenericResponse from "../model/dto/GenericResponse";


export function getSchedule() {
    return fetch('/api/schedule', {
        headers: getTokenHeader()
    }).then(getDefaultDownloadHandler('Ошибка получения расписания'))
        .then((r: GenericResponse<ClubScheduleResponseItem[]>) => r.data);
}

export function uploadScheduleItem(scheduleItem: ClubScheduleItemRequest) {
    return fetch('/api/schedule', {
        headers: getTokenHeader(),
        method: "POST",
        body: JSON.stringify(scheduleItem)
    }).then(getDefaultDownloadHandler('Ошибка отправки расписания'))
        .then((r: GenericResponse<ClubScheduleResponseItem[]>) => r.data);
}

export function updateScheduleItem(scheduleItem: ClubScheduleItemRequest) {
    return fetch('/api/schedule', {
        headers: getTokenHeader(),
        method: "PUT",
        body: JSON.stringify(scheduleItem)
    }).then(getDefaultDownloadHandler('Ошибка отправки расписания'))
        .then((r: GenericResponse<ClubScheduleResponseItem[]>) => r.data);
}
