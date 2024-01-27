import {AppointmentModel} from "@devexpress/dx-react-scheduler";

export class FullBookingSlot {
    constructor(public startDateTime: string, public endDateTime: string, public label: string, public colour: string) {
    }

    static toAppointment(slot: FullBookingSlot): AppointmentModel {
        return {
            startDate: slot.startDateTime,
            endDate: slot.endDateTime,
            title: slot.label,
            id: `${slot.startDateTime}-${slot.endDateTime}`,
            description: `${slot.label}`,
            colour: slot.colour
        };
    }
}

