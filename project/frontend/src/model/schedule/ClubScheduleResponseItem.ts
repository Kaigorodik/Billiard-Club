import {GameVariant} from "../util/GameVariant";
import {AppointmentModel} from "@devexpress/dx-react-scheduler";
import {fromObject} from "../../utils/utils";
import {DayOfWeek} from "../util/DayOfWeek";


export type Pricing = Record<GameVariant, number>;

/**
 * Один слот в расписании.
 */
export class ClubScheduleResponseItem {
    constructor(public id: string,
                public startDateTime: string,
                public endDateTime: string,
                public pricing: Pricing,
                public daysOfWeek: DayOfWeek[]) {
    }

    public static fromObject(o: object): ClubScheduleResponseItem {
        return fromObject(o, ClubScheduleResponseItem);
    }

    toAppointment(): AppointmentModel {
        return {
            startDate: this.startDateTime,
            endDate: this.endDateTime,
            title: 'Meeting',
            id: this.id,
            description: `Снукер: ${this.pricing.snooker} Р\nПул: ${this.pricing.pool} Р\nРусский: ${this.pricing.russian} Р`,
            item: this
        };
    }
}
