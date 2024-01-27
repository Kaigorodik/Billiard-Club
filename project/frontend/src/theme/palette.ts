import {blue, green, orange, red, blueGrey} from '@mui/material/colors';

const white = '#FFFFFF';
const black = '#000000';

const mainColour = '#0B1124';

const palette = {
    black,
    white,
    primary: {
        contrastText: white,
        main: mainColour
    },
    secondary: {
        contrastText: white,
        main: mainColour
    },
    success: {
        contrastText: white,
        main: green[600],
    },
    info: {
        contrastText: white,
        main: blue[600],
    },
    warning: {
        contrastText: white,
        main: orange[600],
    },
    error: {
        contrastText: white,
        main: red[600],
    },
    text: {
        secondary: blueGrey[600],
    },
};

export default palette;

export {
    white,
    black,
    mainColour
};
