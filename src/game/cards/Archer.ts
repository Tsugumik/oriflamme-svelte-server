import IGameEntity from "../../interfaces/IGameEntity";
import { CardId } from "../CardId";
import { PlayerColor } from "../../types/PlayerColor";
import Card from "./Card";

export default class Archer extends Card implements IGameEntity{
    id: CardId = CardId.ARCHER;
    name = "Archer";
    imageUrl = "/cards/archer.jpg";
    details = "Zlikwiduj pierwszą albo ostatnią kartę w kolejce.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: PlayerColor) {
        super(ownerId, color);
    }
}