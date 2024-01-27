import {DayOfWeek} from "../util/DayOfWeek";
import {GameVariant} from "../util/GameVariant";

export class ClubScheduleItemRequest {
    constructor(public item: ScheduleItem, public daysOfWeek: DayOfWeek[], public id?: string) {
    }
}

export class ScheduleItem {
    constructor(public startTime: string, public endTime: string, public pricing: TablesPrices) {
    }
}

export type TablesPrices = Record<GameVariant, number>;
