import {YMaps, Map, Placemark} from 'react-yandex-maps';
import CenteredPanel from "../../components/CenteredPanel";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function ClubsMapPage() {
    const {height, width} = useWindowDimensions();
    return (
        <CenteredPanel style={{width: width * 0.75, height: height * 0.75}}>
            <YMaps>
                <Map width={width * 0.75} height={height * 0.75}
                     defaultState={{center: [56.827013, 60.602790], zoom: 12}}>
                    <Placemark geometry={[56.827013, 60.602790]}
                               properties={{
                                   iconCaption: "ASDFGH",
                                   balloonContentBody:
                                       'This is balloon loaded by the <a href="https://ya.ru">Yandex.Maps</a> API module system'
                               }}
                               modules={['geoObject.addon.balloon']}/>
                </Map>
            </YMaps>
        </CenteredPanel>);
}
