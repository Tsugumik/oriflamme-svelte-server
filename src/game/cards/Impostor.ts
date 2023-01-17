import IGameEntity from "../../interfaces/IGameEntity";
import { CardId } from "../CardId";
import { PlayerColor } from "../../types/PlayerColor";
import Card from "./Card";

export default class Impostor extends Card implements IGameEntity{
    id: CardId = CardId.IMPOSTOR;
    name = "Impostor";
    imageUrl = "/cards/impostor.jpg";
    details = "Skopiuj zdolność sąsiadującej ujawnionej karty postaci.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: PlayerColor) {
        super(ownerId, color);
    }
}