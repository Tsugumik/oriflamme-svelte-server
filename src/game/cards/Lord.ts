import IGameEntity from "../../interfaces/IGameEntity";
import { CardId } from "../CardId";
import { PlayerColor } from "../../types/PlayerColor";
import Card from "./Card";

export default class Lord extends Card implements IGameEntity{
    id: CardId = CardId.LORD;
    name = "Lord";
    imageUrl = "/cards/lord.jpg";
    details = "Otrzymujesz 1 punkt i dodatkowo 1 punkt za każdą sąsiedującą kartę, która należy do twojego rodu.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: PlayerColor) {
        super(ownerId, color);
    }
}