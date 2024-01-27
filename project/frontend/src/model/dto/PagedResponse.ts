export default class PagedResponse<T extends object> {
    constructor(public data: T[], public page: number, public totalCount: number) {
    }
}
