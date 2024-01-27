import Pageable from "../model/dto/Pageable";
import {getDefaultDownloadHandler, getQueryString, getTokenHeader} from "../utils/fetchUtils";
import PagedResponse from "../model/dto/PagedResponse";
import ClubItemDto from "../model/dto/ClubItemDto";
import GenericResponse from "../model/dto/GenericResponse";

export function listClubs(city: string, pageable: Pageable, filters: string[]): Promise<GenericResponse<PagedResponse<ClubItemDto>>> {
    return fetch('/api/clubs?' + getQueryString({city, ...pageable, filters: filters}), {
        headers: getTokenHeader(),
    }).then(getDefaultDownloadHandler('Ошибка получения списка клубов'));
}
