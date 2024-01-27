import {BusinessManager, ClientManager, GuestManager} from "../../rbac/managers";
import React from "react";
import ClientProfilePage from "./ClientProfilePage";
import CenteredPanel from "../../components/CenteredPanel";
import {ClubProfilePage} from "./ClubProfile/ClubProfilePage";

export default function ProfilePage() {
    return (
        <CenteredPanel style={{width: '450px'}}>
            <BusinessManager>
                <ClubProfilePage/>
            </BusinessManager>
            <ClientManager>
                <ClientProfilePage/>
            </ClientManager>
            {/*TODO: remove*/}
            {/*<GuestManager>*/}
            {/*    <ClubProfilePage/>*/}
            {/*</GuestManager>*/}
        </CenteredPanel>);
}
