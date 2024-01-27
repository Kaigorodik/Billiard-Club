import React, {CSSProperties} from 'react';
import {Container, Fade} from "@mui/material";
import Centered from "./Centered";
import {styled} from '@mui/material/styles';

interface StyleProps {
    style?: CSSProperties
}

const StyledCard = styled(Container)(({theme}) => ({
    padding: theme.card.padding,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px',
    display: "flex",
    flexDirection: 'column',
    background: "none",
    maxWidth: 'none',
    // background: theme.card.background,
    // ...style
}));

export default function CenteredPanel({children, style = {}}: React.PropsWithChildren<StyleProps>) {


    return (
        <Centered>
            <Fade in={true}>
                <StyledCard sx={style}>
                    {children}
                </StyledCard>
            </Fade>
        </Centered>
    );
}
