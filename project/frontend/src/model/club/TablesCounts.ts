import {GameVariant} from "../util/GameVariant";

export type TablesCounts = Record<GameVariant, number>;

const defaultTablesInfo = {
    [GameVariant.Russian]: 0,
    [GameVariant.Pool]: 0,
    [GameVariant.Snooker]: 0,
};

export {defaultTablesInfo};
