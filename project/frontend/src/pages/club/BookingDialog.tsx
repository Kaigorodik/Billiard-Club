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
import SlideTransition from "../../components/SlideTransition";
import {getOnFieldChange, getOnIntFieldChange} from "../../utils/utils";
import GameVariantChoice from "../admin/booking/GameVariantChoice";
import {GameVariant, gameVariants} from "../../model/util/GameVariant";
import * as React from "react";
import DefaultInput from "../../components/DefaultInput";
import {allNotEmpty} from "../../utils/validationUtils";
import {addDays, extractDateFromISO, getTotalMinutes} from "../../utils/timeUtils";
import ErrorMessage from "../../components/ErrorMessage";
import {BookingDialogProps} from "../../model/props/BookingDialogProps";
import {Content} from "../admin/booking/BookingsLayout";
import {CalendarCard, FullnessCalendar} from "../../components/FullnessCalendar";

const inputStyle = {margin: '5px'};
const today = extractDateFromISO(new Date().toISOString());
const maxAvailableDate = extractDateFromISO(addDays(new Date(), 14).toISOString());

const currentDate = new Date().toLocaleDateString('en-CA');
export function BookingDialog({onSubmit, open, onClose}: BookingDialogProps) {
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');
    const [count, setCount] = React.useState(1);
    const [bookingDate, setBookingDate] = React.useState(currentDate);
    const [variant, setVariant] = React.useState(GameVariant.Russian as string);

    const startMinutes = getTotalMinutes(startTime);
    const endMinutes = getTotalMinutes(endTime);
    const correctTimePeriod = endMinutes > startMinutes;
    const allFilled = allNotEmpty(startTime, endTime, variant);

    function onDialogSubmit() {
        onSubmit({
            startTime, endTime,
            variant: variant as GameVariant,
            date: bookingDate,
            count: 1
        });
        onClose();
    }


    return (<Dialog TransitionComponent={SlideTransition} open={open} onClose={onClose}>
            <DialogTitle>Забронировать</DialogTitle>
            <DialogContent>
                <Content>
                    <div>
                        <FormControlLabel label='Дата' labelPlacement='start' control={
                            <TextField inputProps={{min: today, max: maxAvailableDate, 'data-testid': "date-input"}}
                                       sx={inputStyle} onChange={getOnFieldChange(setBookingDate)} value={bookingDate} type='date'/>}/>
                        <br/>
                        <FormControlLabel labelPlacement='start' label="Начало" control={
                            <TextField sx={inputStyle} value={startTime} onChange={getOnFieldChange(setStartTime)}
                                       type="time" fullWidth inputProps={{'data-testid': "start-time-input"}}/>}/>
                        <FormControlLabel labelPlacement='start' label="Окончание" control={
                            <TextField sx={inputStyle} value={endTime} onChange={getOnFieldChange(setEndTime)}
                                       type="time"
                                       fullWidth inputProps={{'data-testid': "end-time-input"}}/>}/>
                        <br/>
                        <Typography>Тип игры</Typography>
                        <GameVariantChoice fullWidth variant='outlined' selection={variant} options={gameVariants}
                                           label='' onSelect={setVariant}/>
                        <DefaultInput value={count} onChange={getOnIntFieldChange(setCount)} label='Кол-во столов'
                                      required
                                      fullWidth/>
                        <br/>
                        <ErrorMessage message='*Не все обязательные поля заполнены' condition={!allFilled}/>
                        <ErrorMessage message='*Время окончания периода раньше периода начала'
                                      condition={!correctTimePeriod}/>
                    </div>
                    <CalendarCard>
                        <Typography paragraph variant='h6'>Полная заполненность</Typography>
                        <FullnessCalendar date={bookingDate} variant={variant}/>
                    </CalendarCard>
                </Content>
            </DialogContent>
            <DialogActions>
                <Button data-testid="submitDialog" disabled={!(correctTimePeriod && allFilled)}
                        onClick={onDialogSubmit}>Подтвердить</Button>
            </DialogActions>
        </Dialog>
    );
}
