import IGameEntity from "../../interfaces/IGameEntity";
import { CardId } from "../CardId";
import { PlayerColor } from "../../types/PlayerColor";
import Card from "./Card";

export default class Assasination extends Card implements IGameEntity{
    id: CardId = CardId.ASSASSINATION;
    name = "Assasination";
    imageUrl = "/cards/assassination.jpg";
    details = "Zlikwiduj dowolną kartę w kolejce, następnie odrzuć kartę.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: PlayerColor) {
        super(ownerId, color);
    }
}