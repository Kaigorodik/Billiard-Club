import React from 'react';
import Header from "../header/Header";
import {Outlet} from "react-router-dom";
import {styled} from '@mui/material/styles';
import Logger from "./Logger";
import {Footer} from "./Footer";
import {HeaderLink} from "../../model/util/headerProps";

function Layout(props: any) {
    console.log("render Layout")

    const links = [
        new HeaderLink('Клубы', '/clubs'),
        // new HeaderLink('События', '/events')
    ];
    return (
        <div {...props}>
            <Logger/>
            <Header links={links}/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

const BaseLayout = styled(Layout)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: `${theme.header.height} 1fr ${theme.header.height}`,
    gridRowGap: theme.header.height / 2,
    height: '100%'
}));

export default BaseLayout;
