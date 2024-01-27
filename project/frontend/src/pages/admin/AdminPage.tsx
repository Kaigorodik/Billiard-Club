import {BusinessManager, ClientManager, GuestManager} from "../../rbac/managers";
import React from "react";
import ClubAdminPage from "./club/ClubAdminPage";
import ClientAdminPage from "./client/ClientAdminPage";

export function AdminPage() {
    return (<>
        <GuestManager> {/*TODO: remove*/}
            <ClubAdminPage/>
            {/*<ClientAdminPage/>*/}
        </GuestManager>
        <BusinessManager>
            <ClubAdminPage/>
        </BusinessManager>
        <ClientManager>
            <ClientAdminPage/>
        </ClientManager>
    </>);
}
