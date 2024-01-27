import {useDispatch, useSelector} from "react-redux";
import getPassword from "../../../hooks/getPassword";
import React from "react";
import {getOnFieldChange} from "../../../utils/utils";
import Title from "../../../components/Title";
import {Button, CssBaseline, Typography,} from "@mui/material";
import PasswordEdit from "../../../components/passwordEdit/PasswordEdit";
import ErrorMessage from "../../../components/ErrorMessage";
import {ProfileProps} from "../../../model/props/ProfileSubmitProps";
import {allNotEmpty, orDefault} from "../../../utils/validationUtils";
import {ClubProfile} from "../../../model/club/ClubProfile";
import {PasswordEditVariants} from "../../../model/util/PasswordEditVariants";
import EditableList from "../../../components/EditableList";
import DefaultInput from "../../../components/DefaultInput";
import getProfile from "../../../hooks/getProfile";
import {setProfile} from "../../../store/actions/profile";
import PhotosInput from "../../../components/photosInput/PhotosInput";
import ClubPageLayout from "../../../components/layout/ClubPageLayout";
import {InventoryInput, InventoryInputZone} from "../../../components/InventoryInputZone";



export function ClubProfileEditor({labels, onSubmit, passwordVariant = PasswordEditVariants.SetRegisterPassword}: ProfileProps) {
    const dispatch = useDispatch();
    const password = useSelector(getPassword);
    const clubProfile = orDefault(useSelector(getProfile), new ClubProfile()) as ClubProfile;

    const setClubProfile = (profile: ClubProfile) => dispatch(setProfile(profile));

    function getOnProfilePropertyChanged(property: (p: string) => ClubProfile) {
        return getOnFieldChange((v: string) => setClubProfile(property(v)));
    }

    console.log(clubProfile);
    const allFilledAndCorrect = allNotEmpty(clubProfile.email, clubProfile.phoneNumber, clubProfile.title, clubProfile.address)
        && password?.isFilledCorrectly(passwordVariant as PasswordEditVariants);
    return (
        <>
            <Title title={`${labels.titleLabel} клуба`}/>
            <ClubPageLayout
                leftColumn={
                    (<>
                        <DefaultInput required label="Название" inputProps={{'data-testid': "name-input"}}
                                      onChange={getOnProfilePropertyChanged(n => clubProfile.withTitle(n))}
                                      fullWidth value={clubProfile.title}/>
                        <CssBaseline/>
                        <DefaultInput required label="Электронная почта" type="email"
                                      inputProps={{'data-testid': "email-input"}} value={clubProfile.email}
                                      onChange={getOnProfilePropertyChanged(e => clubProfile.withEmail(e))}
                                      fullWidth/>
                        <CssBaseline/>
                        <DefaultInput label="Номер телефона" required value={clubProfile.phoneNumber}
                                      inputProps={{'data-testid': "phone-input", inputMode: 'numeric'}}
                                      onChange={getOnProfilePropertyChanged(e => clubProfile.withPhone(e))}
                                      fullWidth/>
                        <CssBaseline/>{/*TODO: check format*/}
                        <DefaultInput label="Адрес" required inputProps={{'data-testid': "address-input"}}
                                      value={clubProfile.address}
                                      onChange={getOnProfilePropertyChanged(e => clubProfile.withAddress(e))}
                                      fullWidth/>
                        <CssBaseline/>
                        <InventoryInputZone>
                            <Typography variant='h6' align='center'>
                                Количество столов для:
                            </Typography>
                            <InventoryInput label="Русского бильярда" required defaultValue={0} type='number'
                                            value={clubProfile.inventory?.russian} inputProps={{'data-testid': "rus-input"}}
                                            onChange={getOnProfilePropertyChanged(
                                                e => clubProfile.withRussiansCount(Number.parseInt(e)))} fullWidth/>
                            <CssBaseline/>
                            <InventoryInput label="Американского пула" required defaultValue={0} type='number'
                                            value={clubProfile.inventory?.pool}
                                            onChange={getOnProfilePropertyChanged(
                                                e => clubProfile.withPoolCount(Number.parseInt(e)))} fullWidth/>
                            <CssBaseline/>
                            <InventoryInput label="Снуккера" required defaultValue={0} type='number'
                                            value={clubProfile.inventory?.snooker}
                                            onChange={getOnProfilePropertyChanged(
                                                e => clubProfile.withSnookerCount(Number.parseInt(e)))} fullWidth/>
                            <CssBaseline/>
                        </InventoryInputZone>
                        <EditableList
                            onItemsChanged={items => setClubProfile(clubProfile.withAdditionalServices(items))}
                            title="Дополнительные услуги" inputPlaceholder='Добавить услугу'
                            items={clubProfile.additionalServices}/>
                        <PasswordEdit passwordVariant={passwordVariant}/>
                    </>)
                }
                rightColumn={<PhotosInput images={clubProfile.photos}
                                          onSetImages={i => setClubProfile(clubProfile.withPhotos(i))}/>}
                basement={(<>
                    <DefaultInput label="Описание" fullWidth value={clubProfile.description} multiline minRows={5}
                                  onChange={getOnProfilePropertyChanged(n => clubProfile.withDescription(n))}/>
                    <ErrorMessage message='Не все обязательные поля заполнены' condition={!allFilledAndCorrect}/>
                    <Button data-testid='submit-button' disabled={!allFilledAndCorrect} color='inherit'
                            onClick={() => onSubmit(clubProfile)}>
                        {labels.submitLabel}
                    </Button>
                </>)}
            />
        </>);
}
