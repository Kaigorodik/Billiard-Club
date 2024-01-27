import React, {useEffect} from "react";
import CenteredPanel from "../../components/CenteredPanel";
import BadgePage from "../../components/grid/grid/BadgePage";
import BadgeItem from "../../model/util/BadgeItem";
import Options from "../../components/Options";
import {listClubs} from "../../api/clubsList";
import {useDispatch, useSelector} from "react-redux";
import getPaging from "../../hooks/getPaging";
import {useError} from "../../hooks/logging";
import getCity from "../../hooks/getCity";
import getOptions from "../../hooks/getOptions";
import Option from "../../model/util/Option";
import Title from "../../components/Title";
import {setPaging} from "../../store/actions/setPagingData";


const filters = [
    new Option("russian", "Русский"),
    new Option("pool", "Американский"),
    new Option("snooker", "Снуккер"),
    new Option("bar", "Бар"),
    // new Filter("near", "Рядом"),
    new Option("parking", "Парковка"),
    new Option("wi-fi", "Wi-Fi"),
    // new Option("open-now", "Открыто сейчас"),
    new Option("open-always", "Открыто круглосуточно")
];

export function ClubsPage() {
    const dispatch = useDispatch();
    const error = useError();
    const pageable = useSelector(getPaging);
    const city = useSelector(getCity);
    const chosenFilters = useSelector(getOptions);
    const [data, setData] = React.useState([] as BadgeItem[]);

    useEffect(() => {
        listClubs(city, pageable, chosenFilters.map(f => f.value))
            .then(res => {
                setData(res.data.data.map(BadgeItem.fromClubInfo));
                dispatch(setPaging(res.data.totalCount, pageable.pageSize, res.data.page))
            })
            .catch(e => error(e));
    }, [chosenFilters, pageable, city]);

    return (
        <CenteredPanel style={{padding: 0, margin: '10px 0'}}>
            <Title title={`Бильярдные клубы ${city}`} variant='h5' paragraph/>
                <Options title="Фильтры" options={filters}/>
                {/*<PageButton href='/clubs_map'>На карте</PageButton>*/}
            <BadgePage data={data}/>
        </CenteredPanel>
    );
}
