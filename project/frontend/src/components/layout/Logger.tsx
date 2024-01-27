import React from 'react';
import {Alert, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getLogState} from "../../hooks/logging";
import {hide} from "../../store/actions/log";

export default function Logger() {
    const dispatch = useDispatch();
    const log = useSelector(getLogState);

    function handleClose() {
        dispatch(hide());
    }

    return (
        <Snackbar open={log.text !== undefined} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={log.level} sx={{width: '100%'}}>
                {log.text}
            </Alert>
        </Snackbar>
    );
}

