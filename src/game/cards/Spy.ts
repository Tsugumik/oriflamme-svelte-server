import IGameEntity from "../../interfaces/IGameEntity";
import { CardId } from "../CardId";
import { PlayerColor } from "../../types/PlayerColor";
import Card from "./Card";

export default class Spy extends Card implements IGameEntity{
    id: CardId = CardId.SPY;
    name = "Spy";
    imageUrl = "/cards/spy.jpg";
    details = "Ukradnij 1 punkt graczowi, który jest właścicielem sąsiadującej karty.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: PlayerColor) {
        super(ownerId, color);
    }
}