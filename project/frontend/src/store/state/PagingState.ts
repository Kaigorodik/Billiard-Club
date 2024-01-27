export default class PagingState {
    public constructor(public totalCount: number, public pageSize: number, public pageNumber: number) { }
}

export const initState = new PagingState(5, 5, 0);
