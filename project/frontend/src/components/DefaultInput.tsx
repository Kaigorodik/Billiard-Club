import {styled} from "@mui/material/styles";
import {TextField} from "@mui/material";

const DefaultInput = styled(TextField)(({theme}) => ({
    margin: theme.card.margin
}));

export default DefaultInput;
