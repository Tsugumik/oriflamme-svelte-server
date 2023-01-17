import { CardId } from "../game/CardId";
import { PlayerColor } from "./PlayerColor";

export type TableSyncObject = {
    id: CardId,
    ownerId: string,
    color: PlayerColor,
};