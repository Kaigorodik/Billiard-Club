import PagingPanel from "../PagingPanel";
import Badge from "../badge/Badge";
import classes from './Grid.module.scss';
import BadgeItem from "../../../model/util/BadgeItem";

interface GridProps {
    data: BadgeItem[]
}

export default function BadgePage({data}: GridProps) {
    return (<>
        <div className={classes.gridPane}>
            {data.map(d => <Badge key={d.title} {...d} />)}
        </div>
        <PagingPanel/>
    </>);
}
