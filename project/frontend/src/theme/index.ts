import {createTheme} from "@mui/material";
import type {} from '@mui/lab/themeAugmentation';
import palette from "./palette";
import header from './header';
import card, {ICard, ICardProps} from "./card";
import components from "./components";
import { ruRU } from '@mui/material/locale';

declare module '@mui/material/styles' {
    interface Theme {
        header: {
            color: string
            backgroundColor: string
            height: string
        }
        card: ICard
    }

    // allow configuration using `createTheme`
    interface ThemeOptions {
        header?: {
            color?: string
            backgroundColor?: string
            height?: string
        }
        card?: ICardProps
    }
}

const theme = createTheme({
    // spacing: [0, 4, 8, 16, 32, 64],
    palette,
    header,
    card,
    components
}, ruRU, ruRU);


export default theme;
