import {MenuItem, Select} from "@mui/material";
import React from "react";

interface DropdownProps<T> {
    options: T[]
    selection: T
    onSelect: (a: T) => void
    getOptionLabel?: (x: T) => string
    variant?: "standard" | "outlined" | "filled"
    label: string
    className?: any //Required for styled() use
    fullWidth?: boolean
    readOnly?: boolean
}

export default function Dropdown({fullWidth = false, options, selection, onSelect,
                                     label, variant = 'standard', className, readOnly = false,
                                     getOptionLabel = option => option}: DropdownProps<string>) {
    return (<Select
        readOnly={readOnly}
        fullWidth={fullWidth}
        value={selection}
        onChange={o => onSelect(o.target.value)}
        autoWidth
        placeholder={label}
        label={label}
        variant={variant}
        className={className}>
        {options.map(o => (<MenuItem key={o} value={o}>{o}</MenuItem>))}
    </Select>);
}
