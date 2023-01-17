import { CardId } from "../game/CardId";
import { PlayerColor } from "../types/PlayerColor";

export default interface IGameEntity {
    id: CardId;
    name: string;
    imageUrl: string;
    details: string;
    ownerId: string;
    color: PlayerColor;
    reveal(): void;
}