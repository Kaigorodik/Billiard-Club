import {useWarn} from "../hooks/logging";
import * as React from "react";
import {useEffect} from "react";
import {defaultFullness} from "../tests/testUtils";
import {getFullFilledSlices} from "../api/booking";
import {GameVariant} from "../model/util/GameVariant";
import {Appointments, DayView, Scheduler} from "@devexpress/dx-react-scheduler-material-ui";
import {FullBookingSlot} from "../model/bookings/FullBookingSlot";
import {ViewState} from "@devexpress/dx-react-scheduler";
import Appointment from "./Appointment";
import {styled} from "@mui/material/styles";
import {Card} from "@mui/material";

interface FullnessProps {
    date: string
    variant: string
}

export function FullnessCalendar({date, variant}: FullnessProps) {
    const warn = useWarn();
    const [fullSlots, setFullSlots] = React.useState(defaultFullness);

    useEffect(() => {
        getFullFilledSlices(date, variant as GameVariant)
            .then(setFullSlots)
            .catch(warn);
    }, [date, variant]);


    return (
        <Scheduler locale='RU' data={fullSlots.map(FullBookingSlot.toAppointment)} height={500}>
            <ViewState currentDate={date}/>
            <DayView startDayHour={9} endDayHour={24} cellDuration={60}/>
            <Appointments appointmentComponent={Appointment}/>
        </Scheduler>)
}

export const CalendarCard = styled(Card)(({theme}) => ({
    height: '70%',
    maxWidth: '250px',
    minWidth: '200px',
    // width: '20%',
    margin: '0',
    background: theme.card.background
}));