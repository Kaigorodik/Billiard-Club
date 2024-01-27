import React from 'react';
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import SlideTransition from "./SlideTransition";
import {DialogProps} from "../model/props/DialogProps";

interface ConfirmProps extends DialogProps {
    label: string
}

export default function ({onSubmit, open, onClose, label}: ConfirmProps) {
    return (
        <Dialog TransitionComponent={SlideTransition} open={open} onClose={onClose}>
            <DialogTitle>Вы уверены, что хотите {label}?</DialogTitle>
            <DialogActions>
                <Button onClick={onSubmit}>
                    Подтвердить
                </Button>
                <Button onClick={onClose}>
                    Отмена
                </Button>
            </DialogActions>
        </Dialog>)
}
