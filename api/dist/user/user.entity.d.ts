import { Deck } from "src/decks/deck.entity";
export declare class User {
    id: number;
    username: string;
    password: string;
    displayName: string;
    avatar: string;
    decks: Deck[];
}
