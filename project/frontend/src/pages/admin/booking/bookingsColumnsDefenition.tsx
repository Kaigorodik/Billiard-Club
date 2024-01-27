import {GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {Booking} from "../../../model/bookings/Booking";
import {GridRenderCellParams} from "@mui/x-data-grid/models/params/gridCellParams";
import {IconButton, Link} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import * as React from "react";
import {gameVariants} from "../../../model/util/GameVariant";
import {GridEnrichedColDef} from "@mui/x-data-grid/models/colDef/gridColDef";

export const clubsColumns: Record<string, GridEnrichedColDef<Booking>> = {
    id: {field: 'id', headerName: 'Номер', width: 65, description: 'Номер брони'},
    startTime: {field: 'startTime', headerName: 'Начало', width: 60, description: 'Время начало брони'},
    endTime: {field: 'endTime', headerName: 'Конец', width: 60, description: 'Время окончания брони'},
    email: {
        field: 'email',
        headerName: 'Почта',
        width: 130,
        valueGetter(params: GridValueGetterParams<string, Booking>) {
            return params.row.user?.email;
        },
        description: 'Электронная почта клиента'
    },
    name: {
        field: 'name',
        headerName: 'Имя',
        width: 140,
        valueGetter(params: GridValueGetterParams<string, Booking>) {
            return params.row.user?.name;
        },
        description: 'Имя клиента'
    },
    phoneNumber: {
        field: 'phoneNumber',
        headerName: 'Телефон',
        width: 120,
        valueGetter(params: GridValueGetterParams<string, Booking>) {
            return params.row.user?.phoneNumber;
        },
        description: 'Номер телефона клиента'
    },
    variant: {
        field: 'variant',
        type: 'singleSelect',
        valueOptions: gameVariants,
        headerName: 'Тип игры',
        width: 75,
        description: 'Тип игры'
    },
    count: {field: 'count', headerName: 'Кол-во', width: 55, description: 'Количество забронированных столов'},
};

export const clientColumns: Record<string, GridEnrichedColDef<Booking>> = {
    id: {field: 'id', headerName: 'Номер', width: 65, sortable: false, description: 'Номер брони'},
    startTime: {field: 'startTime', headerName: 'Начало', width: 70, sortable: false, description: 'Время начало брони'},
    endTime: {field: 'endTime', headerName: 'Конец', width: 70, sortable: false, description: 'Время окончания брони'},
    date: {
        field: 'date',
        headerName: 'Дата',
        type: "date",
        width: 100,
        sortable: false,
        valueGetter(params: GridValueGetterParams<string, Booking>) {
            return new Date(params.row.date).toLocaleDateString();
        },
        description: 'Дата брони'
    },
    club: {
        field: 'club',
        headerName: 'Клуб',
        width: 100,
        sortable: false,
        renderCell(params: GridRenderCellParams<string, Booking>) {
            return <Link target='blank' href={`/club?clubId=${params.row.club?.id}`}>{params.row.club?.title}</Link>
        },
        description: 'Клуб брони'
    },
    variant: {
        field: 'variant',
        type: 'singleSelect',
        valueOptions: gameVariants,
        headerName: 'Тип игры',
        width: 80,
        sortable: false,
        description: 'Тип игры'
    },
    count: {field: 'count', headerName: 'Кол-во', width: 70, sortable: false, description: 'Количество забронированных столов'},
};

export function createActions(onEditBooking: (b: Booking) => void, onDeleteBooking: (b: Booking) => void): GridColDef[] {
    return [
        {
            field: 'action',
            type: "actions",
            width: 30,
            headerName: '',
            renderCell: (params: GridRenderCellParams<string, Booking>) =>
                (<IconButton onClick={() => onEditBooking(params.row)}>
                    <Edit/>
                </IconButton>)
        },
        {
            field: 'remove',
            type: "actions",
            width: 30,
            headerName: '',
            renderCell: (params: GridRenderCellParams<string, Booking>) =>
                (<IconButton onClick={() => onDeleteBooking(params.row)}>
                    <Delete/>
                </IconButton>)
        }
    ];
}
