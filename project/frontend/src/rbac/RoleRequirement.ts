// noinspection TypeScriptCheckImport
// @ts-ignore
import {Requirement} from "react-rbac-guard";
import {Role} from "../model/users/Role";
import {Login} from "../store/state/LoginState";

export default class RoleRequirement extends Requirement {
    private readonly requiredRole: Role;
    constructor(requiredRole: Role) {
        super();
        this.requiredRole = requiredRole;
    }

    public isSatisfied(credentials: Login): boolean {
        // assume credentials is an object
        return credentials && credentials.user.role === this.requiredRole;
    }
}
