import {styled} from "@mui/material/styles";
import {Card} from "@mui/material";
import DefaultInput from "./DefaultInput";

const InventoryInputZone = styled(Card)(({theme}) => ({
    margin: '10px 0',
    padding: '10px 15px',
    background: theme.card.background
}));


const InventoryInput = styled(DefaultInput)(({theme}) => ({
    input: {
        height: '15px'
    }
}));

export {InventoryInputZone, InventoryInput};
