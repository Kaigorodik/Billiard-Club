// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {Container} from '@mui/material';
import {styled} from "@mui/material/styles";

const Centered = styled(Container)(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    maxWidth: 'none'
}));

export default Centered;
