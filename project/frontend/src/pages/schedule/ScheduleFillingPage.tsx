import * as React from 'react';
import {ViewState} from '@devexpress/dx-react-scheduler';
import {Appointments, Scheduler, WeekView} from '@devexpress/dx-react-scheduler-material-ui';
import {Typography} from "@mui/material";
import CenteredPanel from '../../components/CenteredPanel';
import EditScheduleItemDialog from './EditScheduleItemDialog';
import {getSchedule, updateScheduleItem, uploadScheduleItem} from "../../api/schedule";
import {defaultSchedule} from "../../tests/testUtils";
import {useEffect} from "react";
import {useWarn} from "../../hooks/logging";
import {ClubScheduleResponseItem} from "../../model/schedule/ClubScheduleResponseItem";
import Appointment from "../../components/Appointment";
import Title from "../../components/Title";
import getCredentials from "../../hooks/getCredentials";
import {useSelector} from "react-redux";
import PageButton from "../../components/PageButton";
import {ClubScheduleItemRequest, ScheduleItem} from "../../model/schedule/ClubScheduleItemRequest";
import {DayOfWeek} from "../../model/util/DayOfWeek";

const currentDate = new Date();

export default function ScheduleFillingPage() {
    const [openAdd, setOpenAdd] = React.useState(false);
    const onClose = () => setOpenAdd(false);
    const [editingItem, setEditingItem] = React.useState(undefined as ClubScheduleResponseItem | undefined);
    const onCloseEdit = () => setEditingItem(undefined);

    const [schedule, setSchedule] = React.useState([defaultSchedule[0]]);
    const club = useSelector(getCredentials);
    const warn = useWarn();

    const onGetSchedule = (s: object[]) =>
        setSchedule(s.map(i => ClubScheduleResponseItem.fromObject(i)));


    useEffect(() => {
        getSchedule().then(onGetSchedule).catch(warn);
    }, []);

    function addItemToSchedule(item: ScheduleItem, days: DayOfWeek[]) {
        uploadScheduleItem(new ClubScheduleItemRequest(item, days))
            .then(onGetSchedule).catch(warn);
    }

    function updateItemToSchedule(item: ScheduleItem, days: DayOfWeek[], id?: string) {
        updateScheduleItem(new ClubScheduleItemRequest(item, days, id))
            .then(onGetSchedule).catch(warn);
    }

    console.log(`render schedule with data ${schedule}`)
    return (
        <CenteredPanel>
            <Title title='Режим работы и цены' paragraph/>
            <Typography>Вы можете задать несколько периодов работы вашего заведения, указав цену для каждого.</Typography>
            <PageButton onClick={() => setOpenAdd(true)}>Добавить период работы</PageButton>
            <br/>
            <Scheduler locale='RU' firstDayOfWeek={1} data={schedule.map(i => i.toAppointment())}>
                <ViewState currentDate={currentDate}/>
                <WeekView startDayHour={9} endDayHour={24}/>
                <Appointments appointmentComponent={props => <Appointment data={props.data} onAppointmentClick={setEditingItem}/>}/>
            </Scheduler>
            {/*For adding new items*/}
            <EditScheduleItemDialog open={openAdd} onClose={onClose} onSubmit={addItemToSchedule}/>
            {/*For editing existing items*/}
            <EditScheduleItemDialog open={editingItem !== undefined} onClose={onCloseEdit}
                                    onSubmit={updateItemToSchedule} title='Изменить период в расписание' editingItem={editingItem}/>
        </CenteredPanel>
    );
}
