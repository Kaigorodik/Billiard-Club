import {getEnumKeys} from "../../utils/utils";

export enum GameVariant { //TODO: translate to russian
    Russian = 'russian',
    Pool = 'pool',
    Snooker = 'snooker'
}

const gameVariants = getEnumKeys(GameVariant);

export {gameVariants};