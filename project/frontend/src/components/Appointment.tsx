import {Card, Typography} from "@mui/material";
import Centered from "./Centered";
import * as React from "react";
import {AppointmentModel, Appointments as AppointmentsBase} from "@devexpress/dx-react-scheduler";
import classes from './BasicStyles.module.scss';
import {extractTimeFromISO} from "../utils/timeUtils";
import {ClubScheduleResponseItem} from "../model/schedule/ClubScheduleResponseItem";

interface AppointmentProps {
    onAppointmentClick?: (item: ClubScheduleResponseItem) => void
    data: AppointmentModel
}

const stub = () => {
};

export default function Appointment({onAppointmentClick = stub, data}: AppointmentProps) {
    console.log(data)
    // children.filter((i: any) => i).forEach((i: any) => console.log(i))
    return (
        <Card className={classes.appointment}
              style={{background: data.colour, cursor: onAppointmentClick === stub ? 'auto' : 'pointer'}}
              onClick={() => onAppointmentClick(data.item)}>
            <Centered style={{padding: 0, margin: 0, flexDirection: 'column'}}>
                {extractTimeFromISO(data.startDate as string)}-{extractTimeFromISO(data.endDate as string)}
                <br/>
                <Typography align='center' className={classes.description}>{data.description}</Typography>
            </Centered>
        </Card>
    );
}