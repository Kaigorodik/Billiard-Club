import {DataGrid, ruRU} from '@mui/x-data-grid';
import {clientColumns, createActions} from "../booking/bookingsColumnsDefenition";
import {BookingsLayout, Content, inputStyle} from "../booking/BookingsLayout";
import Title from "../../../components/Title";
import {FormControlLabel, TextField} from "@mui/material";
import {getOnFieldChange} from "../../../utils/utils";
import PageButton from "../../../components/PageButton";
import * as React from "react";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import {Booking} from "../../../model/bookings/Booking";
import {addBookingAdmin, deleteBooking, editBooking} from "../../../api/booking";
import {useWarn} from "../../../hooks/logging";
import {defaultBookings} from "../../../tests/testUtils";
import EditBookingDialog from "./EditBookingDialog";

const {id, date, startTime, endTime, variant, count, club} = clientColumns;

export default function ClientAdminPage() {
    const [editingBooking, setEditingBooking] = React.useState(undefined as Booking | undefined);
    const onCloseEdit = () => setEditingBooking(undefined);

    const [removingBooking, setRemovingBooking] = React.useState(undefined as Booking | undefined);
    const onCloseRemove = () => setRemovingBooking(undefined);

    const warn = useWarn();
    const [bookings, setBookings] = React.useState([defaultBookings[0]]);//TODO: set

    function onEditBooking(booking: Booking) {
        editBooking(booking)
            .then(setBookings)
            .catch(warn);
    }

    function onRemoveBooking() {
        deleteBooking(removingBooking?.id as string)
            .then(setBookings)
            .catch(warn);
    }

    const columns = [id, date, startTime, endTime, club, variant, count, ...createActions(setEditingBooking, setRemovingBooking)];

    return (<Content>
        <BookingsLayout>
            <Title title='Мои брони'/>
            <DataGrid
                sx={{
                    height: '70%',
                    width: "700px",
                    marginBottom: "15px"
                }}
                disableColumnFilter
                disableColumnMenu
                disableSelectionOnClick
                disableColumnSelector
                disableExtendRowFullWidth
                disableDensitySelector
                // disableColumnReorder
                // disableColumnResize
                rows={bookings}
                columns={columns}
                // pageSize={5}
                // rowsPerPageOptions={[5, 10, 15]}
                localeText={{
                    ...ruRU.components.MuiDataGrid.defaultProps.localeText,
                    filterOperatorIsAnyOf: 'Один из'
                }}/>
        </BookingsLayout>
        <ConfirmationDialog open={removingBooking !== undefined} onClose={onCloseRemove} label='отменить бронь'
                            onSubmit={onRemoveBooking}/>
        <EditBookingDialog open={editingBooking !== undefined} onClose={onCloseEdit}
                           onSubmit={onEditBooking} title='Изменить бронь' editingBooking={editingBooking}/>
    </Content>);
}
