import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import getCredentials from "../../hooks/getCredentials";
import {Button, Menu, MenuItem} from "@mui/material";
import {Link} from "@mui/material";
import {AuthenticatedManager, BusinessManager, GuestManager} from "../../rbac/managers";
import {logoutAction} from "../../store/slices/AuthSlice";

export default function LoginButton() {
    const menuButtonRef = React.useRef(null);
    const [openMenu, setOpenMenu] = React.useState(false);
    const onOpenMenu = () => setOpenMenu(true);
    const closeMenu = () => setOpenMenu(false);
    const dispatch = useDispatch();
    const credentials = useSelector(getCredentials);
    const onLogout = () => {
        dispatch(logoutAction());
        window.location.href = '/';
    };

    return (
        <>
            <AuthenticatedManager>
                <Menu id="basic-menu" open={openMenu}
                      onClose={closeMenu} anchorEl={menuButtonRef.current}>
                    <BusinessManager>
                        <MenuItem onClick={closeMenu}>
                            <Link href='/schedule' underline="hover" color='inherit' variant="h6">
                                Режим работы
                            </Link></MenuItem>
                    </BusinessManager>
                    <MenuItem onClick={closeMenu}>
                        <Link href='/admin' underline="hover" color='inherit' variant="h6">
                            Бронирование
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={closeMenu}>
                        <Link href='/profile' underline="hover" color='inherit' variant="h6">
                            Профиль
                        </Link>
                    </MenuItem>
                </Menu>
                <Link ref={menuButtonRef} onClick={onOpenMenu} underline="hover"
                      sx={{cursor: 'pointer'}} color='inherit' variant="h6">
                    {credentials?.user?.name}
                </Link>
                <Button data-testid="logout-button" color="inherit" onClick={onLogout}>Выйти</Button>
            </AuthenticatedManager>
            <GuestManager>
                {/*<Button color="inherit" href='/registration'>Регистрация</Button>*/}
                <Button color="inherit" href='/authentication'>Вход</Button>
            </GuestManager>
        </>);
}
