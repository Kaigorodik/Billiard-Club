import {GameVariant} from "../util/GameVariant";
import {ClientProfile} from "../users/UserProfile";

export class ClubLink {
    constructor(public id: string, public title: string) {
    }
}

export interface Booking {//TODO: add date and count
    startTime: string
    endTime: string
    variant: GameVariant
    id?: string
    date: string
    count: number
    user?: ClientProfile
    club?: ClubLink
}
