import React, {useEffect} from "react";
import ClientProfileEditor from "../profile/ClientProfileEditor";
import {getCurrentUserProfile, update} from "../../api/profile";
import {ClientProfile} from "../../model/users/UserProfile";
import {useSuccess, useWarn} from "../../hooks/logging";
import {useDispatch, useSelector} from "react-redux";
import getPassword from "../../hooks/getPassword";
import {EditProfileLabels} from "../../model/props/ProfileSubmitProps";
import {setProfile} from "../../store/actions/profile";
import {PasswordEditVariants} from "../../model/util/PasswordEditVariants";
import {ClubProfile} from "../../model/club/ClubProfile";


export default function ClientProfilePage() {
    const password = useSelector(getPassword);
    const dispatch = useDispatch();
    const warn = useWarn();
    const success = useSuccess();

    useEffect(() => {
        getCurrentUserProfile()
            .then(p => dispatch(setProfile(ClientProfile.fromObject(p))))
            .catch(warn);
    }, []);

    function onUpdate(profile: ClientProfile | ClubProfile) {
        update(profile, password?.currentPassword, password?.password)
            .then(() => success('Профиль успешно обновлён'))
            .catch(warn);
    }

    return <ClientProfileEditor passwordVariant={PasswordEditVariants.ChangePassword}
                                labels={EditProfileLabels} onSubmit={onUpdate}/>
}
