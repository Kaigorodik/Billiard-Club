import React from 'react';
import {TablePagination} from "@mui/material";
import getPaging from '../../hooks/getPaging';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {setPage, setPageSize} from "../../store/actions/setPagingData";


export default function PagingPanel() {
    const {totalCount, pageSize, pageNumber} = useSelector(getPaging, shallowEqual);
    const dispatch = useDispatch();
    const handleChangePage = (event: any, page: number) => dispatch(setPage(page));

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
        dispatch(setPageSize(Number.parseInt(e.target.value)));

    return (<TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        page={pageNumber}
        variant='footer'
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        labelRowsPerPage='Кол-во объектов'
        onRowsPerPageChange={handleChangeRowsPerPage}
        count={totalCount}/>);
}
