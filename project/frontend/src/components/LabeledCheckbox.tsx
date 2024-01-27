import {Checkbox, FormControlLabel} from "@mui/material";
import React from "react";

interface CheckboxProps {
    fontSize?: number
    label: string
    checked?: boolean
    onCheck: (val: boolean) => void
}

export default function LabeledCheckbox({fontSize = 12, checked = false, onCheck, label}: CheckboxProps) {
    return (<FormControlLabel componentsProps={{typography: {fontSize: fontSize}}}
                              control={<Checkbox checked={checked} onChange={e => onCheck(e.currentTarget.checked)} size='small'/>} label={label}/>);
}
