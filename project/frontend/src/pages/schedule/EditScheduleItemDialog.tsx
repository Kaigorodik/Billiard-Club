import * as React from "react";
import {
    Button,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    TextField,
    Typography
} from "@mui/material";
import SlideTransition from "../../components/SlideTransition";
import {InventoryInput, InventoryInputZone} from "../../components/InventoryInputZone";
import {getOnFieldChange, getOnIntFieldChange} from "../../utils/utils";
import {ScheduleItem} from "../../model/schedule/ClubScheduleItemRequest";
import {GameVariant} from "../../model/util/GameVariant";
import {DayOfWeek} from "../../model/util/DayOfWeek";
import Options from "../../components/Options";
import Option from "../../model/util/Option";
import {useDispatch, useSelector} from "react-redux";
import getOptions from "../../hooks/getOptions";
import ErrorMessage from "../../components/ErrorMessage";
import {extractTimeFromISO, getTotalMinutes} from "../../utils/timeUtils";
import {ClubScheduleResponseItem} from "../../model/schedule/ClubScheduleResponseItem";
import {useEffect} from "react";
import {setOptions} from "../../store/actions/options";

const inputStyle = {margin: '5px'};

interface EditScheduleItemDialogProps {
    open: boolean
    onClose: () => void
    onSubmit: (s: ScheduleItem, days: DayOfWeek[], id?: string) => void
    allowedVariants?: GameVariant[]//TODO: use it
    editingItem?: ClubScheduleResponseItem
    title?: string
}

const daysOfWeekOptions = [
    new Option(DayOfWeek.Monday.toString(), 'понедельник'),
    new Option(DayOfWeek.Tuesday.toString(), 'вторник'),
    new Option(DayOfWeek.Wednesday.toString(), 'среда'),
    new Option(DayOfWeek.Thursday.toString(), 'четверг'),
    new Option(DayOfWeek.Friday.toString(), 'пятница'),
    new Option(DayOfWeek.Saturday.toString(), 'суббота'),
    new Option(DayOfWeek.Sunday.toString(), 'воскресенье'),
];

export default function EditScheduleItemDialog({open, onClose, onSubmit, editingItem, title = 'Добавить период в расписание', allowedVariants = []}: EditScheduleItemDialogProps) {
    const dispatch = useDispatch();
    const [startTime, setStartTime] = React.useState('10:00');
    const [endTime, setEndTime] = React.useState('22:00');

    const [rusPrice, setRusPrice] = React.useState(200);
    const [poolPrice, setPoolPrice] = React.useState(200);
    const [snookerPrice, setSnookerPrice] = React.useState(200);

    useEffect(() => {//set options if provided
        if (editingItem) {
            dispatch(setOptions(daysOfWeekOptions.filter(
                o => editingItem.daysOfWeek.map(d => d.toString()).includes(o.value))));
            setRusPrice(editingItem.pricing.russian);
            setPoolPrice(editingItem.pricing.pool);
            setSnookerPrice(editingItem.pricing.snooker);
            setStartTime(extractTimeFromISO(editingItem.startDateTime) as string);
            setEndTime(extractTimeFromISO(editingItem.endDateTime) as string);
        }
    }, [editingItem])

    const options = useSelector(getOptions);

    console.log(startTime)

    function onDialogSubmit() {
        const item = new ScheduleItem(startTime, endTime, {
            [GameVariant.Snooker]: snookerPrice,
            [GameVariant.Russian]: rusPrice,
            [GameVariant.Pool]: poolPrice
        });
        onSubmit(item, options.map(o => Number.parseInt(o.value)), editingItem?.id);
        onClose();
    }

    const startMinutes = getTotalMinutes(startTime);
    const endMinutes = getTotalMinutes(endTime);
    const correctTimePeriod = endMinutes > startMinutes;

    return (
        <Dialog TransitionComponent={SlideTransition} open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <FormControlLabel labelPlacement='start' label="Начало" control={
                    <TextField sx={inputStyle} value={startTime} onChange={getOnFieldChange(setStartTime)}
                               type="time" fullWidth inputProps={{'data-testid': "start-time-input"}}/>}/>
                <FormControlLabel labelPlacement='start' label="Окончание" control={
                    <TextField sx={inputStyle} value={endTime} onChange={getOnFieldChange(setEndTime)} type="time"
                               fullWidth inputProps={{'data-testid': "end-time-input"}}/>}/>
                <InventoryInputZone>
                    <Typography variant='h6' align='center'>
                        Цена часа в указанный период для:
                    </Typography>
                    <InventoryInput label="Русского бильярда" required defaultValue={0} type='number'
                                    value={rusPrice} inputProps={{'data-testid': "rus-input"}}
                                    onChange={getOnIntFieldChange(setRusPrice)} fullWidth/>
                    <CssBaseline/>
                    <InventoryInput label="Американского пула" required defaultValue={0} type='number'
                                    value={poolPrice} onChange={getOnIntFieldChange(setPoolPrice)} fullWidth/>
                    <CssBaseline/>
                    <InventoryInput label="Снукера" required defaultValue={0} type='number'
                                    value={snookerPrice} onChange={getOnIntFieldChange(setSnookerPrice)} fullWidth/>
                    <CssBaseline/>
                </InventoryInputZone>
                <Options style={{width: '100%'}} title='Дни недели:' options={daysOfWeekOptions}/>
                <ErrorMessage message='*Не выбран ни один день недели' condition={options.length === 0}/>
                <ErrorMessage message='*Время окончания периода раньше периода начала' condition={!correctTimePeriod}/>
            </DialogContent>
            <DialogActions>
                <Button data-testid="submitDialog" disabled={!correctTimePeriod || options.length === 0}
                        onClick={onDialogSubmit}>Подтвердить</Button>
            </DialogActions>
        </Dialog>);
}
