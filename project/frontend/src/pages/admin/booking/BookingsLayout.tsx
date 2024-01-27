import {styled} from "@mui/material/styles";
import {Box, Container} from "@mui/material";
import exp from "constants";

export const BookingsLayout = styled(Container)(({theme}) => ({
    height: '70%',
    width: 'auto',
    margin: '0',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'ju',
    alignItems: 'center',
    background: theme.card.background
}));

export const inputStyle = {margin: '5px'};

export const Content = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
    height: '100%',
    maxWidth: 'none',
    margin: '0 20px'
}));