import {UserLogin} from "../model/users/UserLogin";
import {Role} from "../model/users/Role";
import assert from "assert";

describe('Test clone function', () => {
    test('Clone UserLogin', () => {
        const userLogin = UserLogin.fromObject({email: "email", name: "username", role: Role.CLIENT}).clone();
        assert(userLogin instanceof UserLogin);
        assert(userLogin.email === 'email');
        assert(userLogin.name === 'username');
        assert(userLogin.role === Role.CLIENT);

    });
    test('Creates UserLogin from raw object', () => {
        const userLogin = UserLogin.fromObject({email: "email", name: "username", role: Role.CLIENT});
        assert(userLogin instanceof UserLogin);
        assert(userLogin.email === 'email');
        assert(userLogin.name === 'username');
        assert(userLogin.role === Role.CLIENT);
    });
});
//
// describe('Test time utils', () => {
//
// });