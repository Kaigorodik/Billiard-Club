import {Button} from "@mui/material";
import React from "react";
import {styled} from "@mui/material/styles";
import {ButtonProps} from "@mui/material/Button/Button";

const StyledButton = styled(Button)(({theme}) => ({
    margin: '5px'
}));

export default function PageButton(buttonProps: ButtonProps) {
    return <StyledButton variant='contained' {...buttonProps}/>;
}
