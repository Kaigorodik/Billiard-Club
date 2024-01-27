import React from 'react';
import {Link, Menu, MenuItem, Typography} from "@mui/material";
import LoginButton from "./LoginButton";
import {styled} from '@mui/material/styles';
import {Bar} from "../layout/Bar";
import {HeaderProps} from "../../model/util/headerProps";
import {LinkProps} from "@mui/material/Link/Link";
import Dropdown from "../Dropdown";
import {attachedCities, Cities} from "../../model/util/Cities";
import {useDispatch, useSelector} from "react-redux";
import getCity from "../../hooks/getCity";
import {setCity} from "../../store/actions/city";

const StyledTypography = styled(Typography)(({theme}) => ({
    flexGrow: "1",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center'
}));

const CustomLink = (props: LinkProps) =>
    <Link {...props} underline='hover' data-testid='index-link' color='inherit'/>;

const CityChoice = styled(Dropdown)(({theme}) => ({
    color: 'white',
    background: 'none'
}));

export default function Header({links = []}: HeaderProps) {
    const dispatch = useDispatch();
    const city = useSelector(getCity);
    const onCityChanged = (city: string) => {
        dispatch(setCity(city as Cities));
    };
    return (
        <Bar>
            <StyledTypography variant="subtitle1">
                <CustomLink href='/'>
                    Billiard Club
                </CustomLink>
                <CityChoice label='Город' options={attachedCities} selection={city} onSelect={onCityChanged}/>
            </StyledTypography>

            {links.map(l => <CustomLink key={l.title} href={l.url}>{l.title}</CustomLink>)}
            <LoginButton/>
        </Bar>
    );
}
