import React, {CSSProperties} from "react";
import classes from './Layout.module.scss';
import Centered from "../Centered";
import Conditional from "../Conditional";

interface ClubPageLayoutProps {
    leftColumn: React.ReactNode
    rightColumn: React.ReactNode
    basement?: React.ReactNode
    style?: CSSProperties
}

export default function ClubPageLayout({leftColumn, rightColumn, basement, style}: ClubPageLayoutProps) {
    return (<>
        <div className={classes.profileLayout} style={style}>
            <div>
                {leftColumn}
            </div>
            <div>
                {rightColumn}
            </div>
        </div>
        <Conditional condition={basement !== undefined}>
            <Centered style={{flexDirection: 'column', margin: '0', padding: '0', maxWidth: 'none'}}>
                {basement}
            </Centered>
        </Conditional>
    </>);
}
