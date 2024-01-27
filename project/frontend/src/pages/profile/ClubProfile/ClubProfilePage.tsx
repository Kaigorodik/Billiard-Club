import {useDispatch, useSelector} from "react-redux";
import getPassword from "../../../hooks/getPassword";
import {useSuccess, useWarn} from "../../../hooks/logging";
import React, {useEffect} from "react";
import {getCurrentUserProfile, update} from "../../../api/profile";
import {setProfile} from "../../../store/actions/profile";
import {ClientProfile} from "../../../model/users/UserProfile";
import {PasswordEditVariants} from "../../../model/util/PasswordEditVariants";
import {EditProfileLabels} from "../../../model/props/ProfileSubmitProps";
import {ClubProfileEditor} from "./ClubProfileEditor";
import {ClubProfile} from "../../../model/club/ClubProfile";

export function ClubProfilePage() {
    const password = useSelector(getPassword);
    const dispatch = useDispatch();
    const warn = useWarn();
    const success = useSuccess();

    useEffect(() => {
        getCurrentUserProfile()
            .then(p => dispatch(setProfile(ClubProfile.fromObject(p))))
            .catch(warn);
    }, []);

    function onUpdate(profile: ClientProfile | ClubProfile) {//TODO: propagate
        update(profile, password?.currentPassword, password?.password)
            .then(() => success('Профиль успешно обновлён'))
            .catch(warn);
    }

    return <ClubProfileEditor passwordVariant={PasswordEditVariants.ChangePassword}
                              labels={EditProfileLabels} onSubmit={onUpdate}/>
}
