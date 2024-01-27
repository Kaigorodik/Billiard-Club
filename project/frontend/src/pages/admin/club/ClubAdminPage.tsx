import * as React from 'react';
import {useEffect} from 'react';
import {Card, FormControlLabel, TextField, Typography} from "@mui/material";
import {DataGrid, ruRU} from '@mui/x-data-grid';
// import Centered from "../../../components/Centered";
import {clubsColumns as allColumns, createActions} from "../booking/bookingsColumnsDefenition";
import {addBookingAdmin, deleteBooking, editBooking, getBookings, getFullFilledSlices} from "../../../api/booking";
import {useWarn} from "../../../hooks/logging";
import {Booking} from "../../../model/bookings/Booking";
import PageButton from "../../../components/PageButton";
import {getOnFieldChange} from "../../../utils/utils";
import {styled} from "@mui/material/styles";
import EditBookingDialog from "./EditBookingDialog";
import {defaultBookings, defaultFullness} from "../../../tests/testUtils";
import Title from "../../../components/Title";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import {Appointments, DayView, Scheduler} from "@devexpress/dx-react-scheduler-material-ui";
import {ViewState} from "@devexpress/dx-react-scheduler";
import {GameVariant, gameVariants} from "../../../model/util/GameVariant";
import GameVariantChoice from "../booking/GameVariantChoice";
import {FullBookingSlot} from "../../../model/bookings/FullBookingSlot";
import {BookingsLayout, Content, inputStyle} from "../booking/BookingsLayout";
import Appointment from "../../../components/Appointment";
import {CalendarCard, FullnessCalendar} from "../../../components/FullnessCalendar";


const {id, startTime, endTime, email, name, phoneNumber, variant: variantCol, count} = allColumns;


const currentDate = new Date().toLocaleDateString('en-CA');

export default function ClubAdminPage() {
    const allowedVariants: GameVariant[] = [];//TODO: fill & use it

    const [variant, setVariant] = React.useState(GameVariant.Russian as string);
    const [editingBooking, setEditingBooking] = React.useState(undefined as Booking | undefined);
    const onCloseEdit = () => setEditingBooking(undefined);

    const [removingBooking, setRemovingBooking] = React.useState(undefined as Booking | undefined);
    const onCloseRemove = () => setRemovingBooking(undefined);

    const [bookings, setBookings] = React.useState([defaultBookings[0]]);
    const [date, setDate] = React.useState(currentDate);
    const [openAdd, setOpenAdd] = React.useState(false);
    const onAddClose = () => setOpenAdd(false);
    const onAddOpen = () => setOpenAdd(true);

    const warn = useWarn();

    useEffect(() => {
        getBookings(date)
            .then(setBookings)
            .catch(warn);
    }, [date]);



    function onAddBooking(booking: Booking) {
        addBookingAdmin(booking)
            .then(setBookings)
            .catch(warn);
    }

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

    const columns = [id, startTime, endTime, email, name, phoneNumber, variantCol, count, ...createActions(setEditingBooking, setRemovingBooking)];

    return (
        <Content>
            <BookingsLayout>
                <Title title='Управление бронированием'/>
                <div style={{padding: '3px 5px'}}>
                    <FormControlLabel sx={inputStyle} label='Дата' labelPlacement='start' control={
                        <TextField sx={inputStyle} onChange={getOnFieldChange(setDate)} value={date} type='date'/>}/>
                    <PageButton onClick={onAddOpen} sx={inputStyle}>Добавить бронь</PageButton>
                </div>
                <DataGrid
                    sx={{height: '70%',
                        width: "800px",
                        marginBottom: "15px"}}
                    rows={bookings}
                    columns={columns}
                    // pageSize={bookings.length}
                    rowsPerPageOptions={[5, 10, 15]}
                    localeText={{
                        ...ruRU.components.MuiDataGrid.defaultProps.localeText,
                        filterOperatorIsAnyOf: 'Один из'
                    }}/>
            </BookingsLayout>
            <CalendarCard>
                <div style={{padding: '3px 5px'}}>
                    <Typography paragraph variant='h6'>Полная заполненность</Typography>
                    <FormControlLabel label='Тип игры' labelPlacement='start' control={
                        <GameVariantChoice fullWidth variant='outlined' selection={variant}
                                           options={gameVariants} label='' onSelect={setVariant}/>}/>

                </div>
                <FullnessCalendar date={date} variant={variant}/>
            </CalendarCard>
            {/*For adding new booking*/}
            <EditBookingDialog variant={variant as GameVariant} open={openAdd} onSubmit={onAddBooking} onClose={onAddClose} date={date}/>
            {/*For editing existing bookings*/}
            <EditBookingDialog open={editingBooking !== undefined} onClose={onCloseEdit}
                               onSubmit={onEditBooking} title='Изменить бронь' editingBooking={editingBooking}/>
            <ConfirmationDialog open={removingBooking !== undefined} onClose={onCloseRemove} label='отменить бронь'
                                onSubmit={onRemoveBooking}/>
        </Content>);
}
