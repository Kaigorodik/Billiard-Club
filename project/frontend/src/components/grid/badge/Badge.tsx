import React from 'react';
import {Card, CardActionArea, CardContent, Fade, Typography} from "@mui/material";
import classes from './Badge.module.scss'
import BadgeItem from "../../../model/util/BadgeItem";

export default function Badge({title, description, label, backgroundUrl, href}: BadgeItem) {
    return (
        <Fade in={true}>
            <Card className={classes.root} sx={{backgroundImage: backgroundUrl, backgroundColor: 'rgba(50,50,50,0.9)'}}>
                <CardActionArea className={classes.area} href={href}>
                    <CardContent className={classes.card}>
                        <div className={classes.description}>
                            <Typography variant='h6'>{title}</Typography>
                            <br/>
                            <Typography className={classes.description} variant='subtitle2'>{description}</Typography>
                            <br/>
                        </div>
                        <Typography variant='subtitle2' className={classes.label}>{label}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Fade>);
}
