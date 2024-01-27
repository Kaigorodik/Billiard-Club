import * as React from "react";
import {useEffect} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    TextField,
    Typography
} from "@mui/material";
import SlideTransition from "../../../components/SlideTransition";
import {getOnFieldChange, getOnIntFieldChange} from "../../../utils/utils";
import {GameVariant, gameVariants} from "../../../model/util/GameVariant";
import {useDispatch} from "react-redux";
import ErrorMessage from "../../../components/ErrorMessage";
import {addDays, extractDateFromISO, getTotalMinutes} from "../../../utils/timeUtils";
import {allNotEmpty} from "../../../utils/validationUtils";
import DefaultInput from "../../../components/DefaultInput";
import {ClientProfile} from "../../../model/users/UserProfile";
import GameVariantChoice from "../booking/GameVariantChoice";
import {BookingDialogProps} from "../../../model/props/BookingDialogProps";

const inputStyle = {margin: '5px'};
const today = extractDateFromISO(new Date().toISOString());
const maxAvailableDate = extractDateFromISO(addDays(new Date(), 14).toISOString()); //TODO: extract

export default function EditBookingDialog({open, date, variant: defVariant, onClose, onSubmit, editingBooking, title = 'Добавить бронь'}: BookingDialogProps) {
    const dispatch = useDispatch();
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');
    const [count, setCount] = React.useState(1);
    const [bookingDate, setBookingDate] = React.useState('');
    const [variant, setVariant] = React.useState(GameVariant.Russian as string);


    useEffect(() => {//set options if provided
        if (editingBooking) {
            setVariant(editingBooking.variant);
            setStartTime(editingBooking.startTime);
            setEndTime(editingBooking.endTime);
            setBookingDate(editingBooking.date);
            setCount(editingBooking.count);
        }
    }, [editingBooking]);

    useEffect(() => {
        if (!editingBooking && defVariant)
            setVariant(defVariant)
    }, [defVariant]);

    useEffect(() => {
        if (date)
            setBookingDate(date);
    }, [date])

    function onDialogSubmit() {
        onSubmit({
            startTime, endTime,
            variant: variant as GameVariant,
            date: bookingDate,
            count: count
        });
        onClose();
    }

    const startMinutes = getTotalMinutes(startTime);
    const endMinutes = getTotalMinutes(endTime);
    const correctTimePeriod = endMinutes > startMinutes;
    const allFilled = allNotEmpty(startTime, endTime, variant);

    return (
        <Dialog TransitionComponent={SlideTransition} open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <FormControlLabel label='Дата' labelPlacement='start'  control={
                    <TextField inputProps={{'data-testid': "date-input"}} sx={inputStyle}
                               onChange={getOnFieldChange(setBookingDate)} value={bookingDate} type='date'/>}/>
                <br/>
                <FormControlLabel labelPlacement='start' label="Начало" control={
                    <TextField sx={inputStyle} value={startTime} onChange={getOnFieldChange(setStartTime)}
                               type="time" fullWidth inputProps={{min: today, max: maxAvailableDate, 'data-testid': "start-time-input"}}/>}/>
                <FormControlLabel labelPlacement='start' label="Окончание" control={
                    <TextField sx={inputStyle} value={endTime} onChange={getOnFieldChange(setEndTime)} type="time"
                               fullWidth inputProps={{'data-testid': "end-time-input"}}/>}/>
                <br/>
                <Typography>Тип игры</Typography>
                <GameVariantChoice fullWidth variant='outlined' selection={variant} options={gameVariants}
                                   label='' onSelect={setVariant}/>
                <br/>
                <DefaultInput value={count} onChange={getOnIntFieldChange(setCount)} label='Кол-во столов' required fullWidth/>
                <br/>
                <ErrorMessage message='*Не все обязательные поля заполнены' condition={!allFilled}/>
                <ErrorMessage message='*Время окончания периода раньше периода начала' condition={!correctTimePeriod}/>
            </DialogContent>
            <DialogActions>
                <Button data-testid="submitDialog" disabled={!(correctTimePeriod && allFilled)}
                        onClick={onDialogSubmit}>Подтвердить</Button>
            </DialogActions>
        </Dialog>);
}
