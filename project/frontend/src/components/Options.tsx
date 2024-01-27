import {Accordion, AccordionDetails, AccordionSummary, FormGroup, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LabeledCheckbox from "./LabeledCheckbox";
import React, {CSSProperties} from "react";
import {styled} from '@mui/material/styles';
import {useDispatch, useSelector} from "react-redux";
import {clearOptions, setOptions} from "../store/actions/options";
import Option from "../model/util/Option";
import PageButton from "./PageButton";
import getOptions from "../hooks/getOptions";

interface OptionsProps {
    title: string
    options: Option[]
    style?: CSSProperties
    // chosenOptions: Option[]
}

const CheckBoxGroup = styled(FormGroup)(({theme}) => ({
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
}));

const StyledAccordion = styled(Accordion)(({theme}) => ({
    width: "50%",
    background: theme.card.background,
}));

export default function Options({title, options, style}: OptionsProps) {
    const dispatch = useDispatch();

    const [expanded, setExpanded] = React.useState(false);
    const chosenOptions = useSelector(getOptions);
    const [chosen, setChosen] = React.useState(chosenOptions);

    function onCheck(val: boolean, option: Option) {
        if (val)
            setChosen([option, ...chosen]);
        else
            setChosen(chosen.filter(f => f.value !== option.value));
    }

    function onOptionsSubmit() {
        dispatch(setOptions(chosen));
        setExpanded(false);
    }

    function onOptionsClear() {
        dispatch(clearOptions());
        setChosen([]);
        setExpanded(false);
    }

    return (
        <StyledAccordion expanded={expanded} onChange={() => setExpanded(!expanded)} sx={style}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <CheckBoxGroup>
                    {options.map(o =>
                        (<LabeledCheckbox checked={chosen.find(f => f.value === o.value) !== undefined}
                                          onCheck={val => onCheck(val, o)} key={o.value} label={o.title}/>))}
                </CheckBoxGroup>
                <PageButton onClick={onOptionsSubmit} data-testid="submitOptions">Подтвердить</PageButton>
                <PageButton onClick={onOptionsClear}>Очистить</PageButton>
            </AccordionDetails>
        </StyledAccordion>);
}
