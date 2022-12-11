import ICard from "./cards/ICard";

export default class Table {
    cards: Array<ICard>;
    constructor() {
        this.cards = new Array<ICard>
    }
}