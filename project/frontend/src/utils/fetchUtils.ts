import {StorageKeys} from "./StorageKeys";

export function handleErrorDefault(r: Response, template: string) {
    return r.json().catch(r => {
        throw new Error(`${template}: непредвиденная ошибка.`)
    }).then(m => {
        throw new Error(`${template}: ${m.message}`);
    });
}

export function getDefaultDownloadHandler(template = 'Ошибка получения данных') {
    return (r: Response) => {
        if (!r.ok) {
            return handleErrorDefault(r, template);
        }
        return r.json();
    }
}

export function getDefaultUploadHandler(template = 'Ошибка отправки данных') {
    return (r: Response) => {
        if (r.ok) {
            return {};
        } else {
            return handleErrorDefault(r, template);
        }
    };
}

export function getTokenHeader() {
    return { "Authorization": "Bearer " + localStorage.getItem(StorageKeys.AccessToken) };
}

export function getQueryString(params: object) {
    const urlParams = new URLSearchParams();
    for (const k in params) {
        // @ts-ignore
        const value = params[k];
        if (value !== undefined && value !== null && value !== '')
            urlParams.append(k, value)
    }
    return urlParams.toString();
}
