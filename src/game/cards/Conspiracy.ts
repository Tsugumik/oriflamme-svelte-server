import IGameEntity from "../../interfaces/IGameEntity";
import { CardId } from "../CardId";
import { PlayerColor } from "../../types/PlayerColor";
import Card from "./Card";

export default class Conspiracy extends Card implements IGameEntity{
    id: CardId = CardId.CONSPIRACY;
    name = "Conspiracy";
    imageUrl = "/cards/conspiracy.jpg";
    details = "Otrzymujesz dwukrotność punktów zgromadzonych na karcie, następnie ją odrzuć.";
    reveal() {
        return "xd";
    }
    constructor(ownerId: string, color: PlayerColor) {
        super(ownerId, color);
    }
}