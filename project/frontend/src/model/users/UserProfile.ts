import {ClientLogin} from "./UserLogin";
import {fromObject} from "../../utils/utils";

export class ClientProfile extends ClientLogin {
    constructor(email: string = '', name: string = '', public phoneNumber: string = '') {
        super(email, name);
    }

    public withPhone(phoneNumber: string): any {
        const copy = this.clone();
        copy.phoneNumber = phoneNumber;
        return copy;
    }

    public static fromObject(o: any): any {
        return fromObject(o, ClientProfile);
    }
}
