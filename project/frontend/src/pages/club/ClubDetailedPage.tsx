import React, {useEffect, useState} from 'react';
import {Navigate, useSearchParams} from 'react-router-dom';
import Title from "../../components/Title";
import ClubPageLayout from "../../components/layout/ClubPageLayout";
import {Card, Typography} from "@mui/material";
import EditableList from "../../components/EditableList";
import {ClubProfile} from "../../model/club/ClubProfile";
import {ImagesViewer} from "../../components/photosInput/ImagesViewer";
import Centered from '../../components/Centered';
import {getClubProfile} from "../../api/profile";
import {useInfo, useSuccess, useWarn} from "../../hooks/logging";
import {Cities} from "../../model/util/Cities";
import ImageDTO from "../../model/dto/ImageDTO";
import {StubAction} from "../../model/util/ImageAction";
import PageButton from "../../components/PageButton";
import {DescriptionField} from "../../components/DescriptionField";
import {styled} from "@mui/material/styles";
import classes from './ClubDetailedPage.module.scss';
import {BookingDialog} from "./BookingDialog";
import {defaultTablesInfo} from "../../model/club/TablesCounts";
import {Booking} from "../../model/bookings/Booking";
import {addBookingClient} from "../../api/booking";

const StyledCard = styled(Card)(({theme}) => ({
    background: theme.card.background,
    padding: '10px',
    width: '100%'
}));

const clubDefaultProfile = new ClubProfile("1@1", "1", "club", "ATEGWDASV WW", "a", Cities.Ekb, //TODO: remove
    [new ImageDTO('1', 'https://avatars.mds.yandex.net/get-zen_doc/1680084/pub_5fa67a30b1fbcf2e239d6ee7_5fa67b2047a34812ce75e74e/scale_1200'),
        new ImageDTO('1', 'https://avatars.mds.yandex.net/get-zen_doc/1680084/pub_5fa67a30b1fbcf2e239d6ee7_5fa67b2047a34812ce75e74e/scale_1200', StubAction),
        new ImageDTO('1', 'https://avatars.mds.yandex.net/get-zen_doc/1680084/pub_5fa67a30b1fbcf2e239d6ee7_5fa67b2047a34812ce75e74e/scale_1200', StubAction),
        new ImageDTO('1', 'https://avatars.mds.yandex.net/get-zen_doc/1680084/pub_5fa67a30b1fbcf2e239d6ee7_5fa67b2047a34812ce75e74e/scale_1200', StubAction),
        new ImageDTO('1', 'https://avatars.mds.yandex.net/get-zen_doc/1680084/pub_5fa67a30b1fbcf2e239d6ee7_5fa67b2047a34812ce75e74e/scale_1200', StubAction),
        new ImageDTO('1', 'https://avatars.mds.yandex.net/get-zen_doc/1680084/pub_5fa67a30b1fbcf2e239d6ee7_5fa67b2047a34812ce75e74e/scale_1200', StubAction),
        new ImageDTO('1', 'https://avatanplus.com/files/resources/mid/5e634fd5c1002170b3efdb1f.jpg', StubAction),
    ], defaultTablesInfo, ['a']);


export default function ClubDetailedPage() {
    const [params] = useSearchParams();
    const [openBookingDialog, setOpenBookingDialog] = useState(false);
    const clubId = params.get('clubId');
    const warn = useWarn();
    const success = useSuccess();

    const [clubProfile, setClubProfile] = useState(clubDefaultProfile);

    useEffect(() => {
        if (clubId)
            getClubProfile(clubId as string)
                .then(p => setClubProfile(ClubProfile.fromObject(p)))
                .catch(warn);
    }, []);

    if (!clubId) {
        return <Navigate to='/empty_club_id'/> //TODO: provide page for not_found
    }

    function pinImage(image: ImageDTO) {
        setClubProfile(clubProfile.withPhotos(ImageDTO.pinImage(clubProfile.photos, image)));
    }

    function makeBooking(booking: Booking) {
        addBookingClient(booking, clubId as string)
            .then(i => success('Бронь успешно создана'))
            .catch(warn);
    }

    return (
        <Centered>
            <div className={classes.clubDetailedPage}>
                <Title title={`Информация о клубе ${clubProfile.title}`}/>
                <ClubPageLayout style={{minWidth: 'auto'}}
                                leftColumn={
                                    (<>
                                        <Typography variant='h6'>
                                            Контактные данные
                                        </Typography>
                                        <DescriptionField title="Электронная почта">
                                            {clubProfile.email}
                                        </DescriptionField>
                                        <DescriptionField title="Номер телефона">
                                            {clubProfile.phoneNumber}
                                        </DescriptionField>
                                        <DescriptionField title="Адрес">
                                            {clubProfile.address}
                                        </DescriptionField>
                                        <br/>
                                        <Typography variant='h6'>
                                            Количество столов для:
                                        </Typography>
                                        <DescriptionField title="Русского бильярда">
                                            {clubProfile.inventory?.russian}
                                        </DescriptionField>
                                        <DescriptionField title="Американского пула">
                                            {clubProfile.inventory?.pool}
                                        </DescriptionField>
                                        <DescriptionField title="Снуккера">
                                            {clubProfile.inventory?.snooker}
                                        </DescriptionField>
                                        <br/>
                                        <EditableList title="Дополнительные услуги" inputPlaceholder='Добавить услугу'
                                                      items={clubProfile.additionalServices} readonly/>
                                        <br/>
                                        <StyledCard>
                                            <Typography paragraph>{clubProfile.description}</Typography>
                                        </StyledCard>
                                        <br/>
                                        <PageButton onClick={() => setOpenBookingDialog(true)}>
                                            Забронировать стол
                                        </PageButton>
                                    </>)
                                }
                                rightColumn={<ImagesViewer onImageClick={pinImage} images={clubProfile.photos}/>}
                />
            </div>
            <BookingDialog open={openBookingDialog} onClose={() => setOpenBookingDialog(false)} onSubmit={makeBooking}/>
        </Centered>);

}

