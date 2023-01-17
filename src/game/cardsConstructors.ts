import Ambush from "./cards/Ambush";
import Archer from "./cards/Archer";
import Assasination from "./cards/Assassination";
import Conspiracy from "./cards/Conspiracy";
import Heir from "./cards/Heir";
import Impostor from "./cards/Impostor";
import Knight from "./cards/Knight";
import Lord from "./cards/Lord";
import RoyalDecree from "./cards/RoyalDecree";
import Spy from "./cards/Spy";
import { CardId } from "./CardId";
import UnknownCard from "./cards/UnknownCard";

export const cardsConstructorsArray = new Array(
    Ambush,
    Archer,
    Assasination,
    Conspiracy,
    Heir,
    Impostor,
    Knight,
    Lord,
    RoyalDecree,
    Spy
);

export const cardsConstructorsObjectStringKey = {
    "ambush": Ambush,
    "archer": Archer,
    "assasination": Assasination,
    "conspiracy": Conspiracy,
    "heir": Heir,
    "impostor": Impostor,
    "knight": Knight,
    "lord": Lord,
    "royaldecree": RoyalDecree,
    "spy": Spy
}

export const CardsConstructors = {
    [CardId.AMBUSH]: Ambush,
    [CardId.ARCHER]: Archer,
    [CardId.ASSASSINATION]: Assasination,
    [CardId.CONSPIRACY]: Conspiracy,
    [CardId.HEIR]: Heir,
    [CardId.IMPOSTOR]: Impostor,
    [CardId.KNIGHT]: Knight,
    [CardId.LORD]: Lord,
    [CardId.ROYALDECREE]: RoyalDecree,
    [CardId.SPY]: Spy,
    [CardId.UNKNOWN]: UnknownCard
}
