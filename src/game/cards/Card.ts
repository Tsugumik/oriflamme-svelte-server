import { PlayerColor } from "../../types/PlayerColor";

export default class Card {
    ownerId: string;
    color: PlayerColor;
    constructor(ownerId: string, color: PlayerColor) {
        this.ownerId = ownerId;
        this.color = color;
    }
}