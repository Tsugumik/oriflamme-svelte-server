import IGameEntity from "../../interfaces/IGameEntity";
import { CardId } from "../CardId";
import { PlayerColor } from "../../types/PlayerColor";
import Card from "./Card";

export default class Ambush extends Card implements IGameEntity{
    id: CardId = CardId.AMBUSH;
    name = "Ambush";
    imageUrl = "/cards/ambush.jpg";
    details = "Odrzuć wszystkie punkty znajdujące się na karcie i zyskaj 1 punkt, następnie odrzuć kartę. Po zabiciu przez przeciwnika, odrzuć kartę i otrzymaj 4 punkty.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: PlayerColor) {
        super(ownerId, color);
    }
}