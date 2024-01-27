import {Role} from "./Role";
import {fromObject} from "../../utils/utils";

export class UserLogin {
    constructor(public email: string, public name: string, public role: Role) {
    }

    public clone(): any { //TODO: move to clonable
        const cloneObj = new (this.constructor as any)();
        for (const attribute in this) {
            cloneObj[attribute] = this[attribute]
        }
        return cloneObj;
    }

    public withEmail(email: string): any {
        const copy = this.clone();
        copy.email = email;
        return copy;
    }

    public withName(name: string): any {
        const copy = this.clone();
        copy.name = name;
        return copy;
    }

    public static fromObject(o: any): any {
        return fromObject(o, UserLogin);
    }
}

export class BusinessLogin extends UserLogin {
    constructor(email: string, public title: string) {
        super(email, title, Role.CLUB);
    }
}

export class ClientLogin extends UserLogin {
    constructor(email: string, name: string) {
        super(email, name, Role.CLIENT);
    }
}
