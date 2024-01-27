import {Link} from "@mui/material";
import React from "react";
import CenteredPanel from "../components/CenteredPanel";

export function NoMatch() {
    return (
        <CenteredPanel>
            <h2>Nothing to see here!</h2>
            <p>
                <Link href='/'>Go to the home page</Link>
            </p>
        </CenteredPanel>
    );
}
