import React from 'react';
import {Helmet} from "react-helmet";
import {Typography} from "@mui/material";
import {OverridableStringUnion} from "@mui/types";
import {Variant} from "@mui/material/styles/createTypography";
import {TypographyPropsVariantOverrides} from "@mui/material/Typography/Typography";

interface TitleProps {
    title: string
    paragraph?: boolean
    variant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
}

export default function Title({title, paragraph = false, variant = 'h5'}: TitleProps) {
    return (<>
        <Helmet title={title}/>
        <Typography variant={variant} align='center' paragraph={paragraph}>
            {title}
        </Typography>
    </>);
}
