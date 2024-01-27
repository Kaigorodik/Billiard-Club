import React from "react";
import classes from './BasicStyles.module.scss';

interface DescriptionFieldProps {
    title: string
}

export function DescriptionField({title, children}: React.PropsWithChildren<DescriptionFieldProps>) {
    return (<div className={classes.descriptionField}>{title}: {children}</div>)
}
