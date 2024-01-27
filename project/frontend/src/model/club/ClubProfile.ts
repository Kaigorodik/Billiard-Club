import {Cities} from "../util/Cities";
import {ClientProfile} from "../users/UserProfile";
import {GameVariant} from "../util/GameVariant";
import ImageDTO from "../dto/ImageDTO";
import {Role} from "../users/Role";
import {fromObject} from "../../utils/utils";
import {defaultTablesInfo, TablesCounts} from "./TablesCounts";



export class ClubProfile extends ClientProfile {
    constructor(email: string = '', phoneNumber: string = '', public title: string = '', public description: string = '',
                public address: string = '', public city: Cities = Cities.Ekb, public photos: ImageDTO[] = [],
                public inventory: TablesCounts = defaultTablesInfo, public additionalServices: string[] = []) {
        super(email, title, phoneNumber);
        this.role = Role.CLUB;
    }

    public withAdditionalServices(services: string[]): any {
        const copy = this.clone();
        copy.additionalServices = services;
        return copy;
    }

    public withDescription(description: string): any {
        const copy = this.clone();
        copy.description = description;
        return copy;
    }

    public withTitle(title: string): any {
        const copy = this.clone();
        copy.title = title;
        return copy;
    }

    public withAddress(address: string): any {
        const copy = this.clone();
        copy.address = address;
        return copy;
    }

    public withCity(city: string): any {
        const copy = this.clone();
        copy.city = city;
        return copy;
    }

    public withPhotos(photos: ImageDTO[]) {
        const copy = this.clone();
        copy.photos = photos;
        return copy;
    }

    public withInventory(inventory: TablesCounts): any {
        const copy = this.clone();
        copy.inventory = inventory;
        return copy;
    }

    public withRussiansCount(number: number) {
        return this.withInventory({...this.inventory, [GameVariant.Russian]: number});
    }

    public withPoolCount(number: number) {
        return this.withInventory({...this.inventory, [GameVariant.Pool]: number});
    }

    public withSnookerCount(number: number) {
        return this.withInventory({...this.inventory, [GameVariant.Snooker]: number});
    }

    public static fromObject(o: any): any {
        return fromObject(o, ClubProfile);
    }
}

