import {AppBar, Toolbar} from "@mui/material";
import {styled} from "@mui/material/styles";
import React from "react";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    backgroundColor: theme.header.backgroundColor,
    color: theme.header.color
}));


export function Bar({children}: React.PropsWithChildren<any>) {
    return (
        <AppBar position='static'>
            <StyledToolbar variant='dense'>
                {children}
            </StyledToolbar>
        </AppBar>);
}
