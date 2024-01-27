import React from 'react';
import CenteredPanel from "../components/CenteredPanel";
import {getEnumKeys} from "../utils/utils";
import {attachedCities, Cities} from "../model/util/Cities";
import PageButton from "../components/PageButton";
import {Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {setCity} from "../store/actions/city";
import {Helmet} from "react-helmet";

export default function StartPage() {
    const cities = getEnumKeys(Cities) as Cities[];
    const dispatch = useDispatch();

    function onCityChosen(city: Cities) {
        dispatch(setCity(city));
        window.location.href = '/clubs';
    }

    return (
        <CenteredPanel>
            <Helmet title='Billiard club' />
            <Typography variant='h4' paragraph>Billiard club</Typography>
            <Typography>Лучшие бильярдные клубы вашего города</Typography>
            <Typography>Бесплатное бронирование бильярдных столов</Typography>
            <Typography paragraph>Выберите город</Typography>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridAutoRows: '50px',
                gridRowGap: '10px',
                height: '100%'
            }}>
                {cities.map(c =>
                    (<PageButton disabled={!attachedCities.includes(c)} key={c} onClick={() => onCityChosen(c)}>{c}</PageButton>))}
            </div>
            <Typography paragraph>
                Мы делаем бронирование удобным и надежным -
                минимум ожидания и никаких занятых телефонов
            </Typography>
        </CenteredPanel>
    );
}

