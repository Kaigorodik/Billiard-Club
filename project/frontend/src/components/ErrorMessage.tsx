import React from 'react';
import Conditional from "./Conditional";
import {Typography} from "@mui/material";

interface ErrorMessageProps {
    message: string
    condition: boolean
}

export default function ErrorMessage({message, condition}: ErrorMessageProps) {
    return (
        <Conditional condition={condition}>
            <Typography style={{fontSize: '0.9rem'}} color='error' align='center'>
                {message}
            </Typography>
        </Conditional>);
}
