// @ts-ignore
import { guardFactory, any, not } from "react-rbac-guard";
import RoleRequirement from "./RoleRequirement";
import {Role} from "../model/users/Role";

const businessRequirement = new RoleRequirement(Role.CLUB);
const clientRequirement = new RoleRequirement(Role.CLIENT);

const authenticatedRequirement = any(businessRequirement, clientRequirement);
const notAuthenticatedRequirement = not(authenticatedRequirement);

const AuthenticatedManager = guardFactory(authenticatedRequirement);
const BusinessManager = guardFactory(businessRequirement);
const ClientManager = guardFactory(clientRequirement);
const GuestManager = guardFactory(notAuthenticatedRequirement);

export {
    AuthenticatedManager,
    BusinessManager,
    ClientManager,
    GuestManager
};
