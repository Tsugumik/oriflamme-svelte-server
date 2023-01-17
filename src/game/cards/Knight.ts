import IGameEntity from "../../interfaces/IGameEntity";
import { CardId } from "../CardId";
import { PlayerColor } from "../../types/PlayerColor";
import Card from "./Card";

export default class Knight extends Card implements IGameEntity{
    id: CardId = CardId.KNIGHT;
    name = "Knight";
    imageUrl = "/cards/knight.jpg";
    details = "Zlikwiduj sąsiadującą kartę.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: PlayerColor) {
        super(ownerId, color);
    }
}