import {Booking} from "../bookings/Booking";
import {GameVariant} from "../util/GameVariant";

export interface BookingDialogProps {
    open: boolean
    onClose: () => void
    onSubmit(booking: Booking): void
    editingBooking?: Booking
    variant?: GameVariant
    title?: string
    date?: string
}