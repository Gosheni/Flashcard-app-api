import { Deck } from "src/decks/deck.entity";
import { User } from "src/user/user.entity";
export declare class Card {
    id: string;
    front: string;
    back: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    userId: number;
    deck: Deck;
    deckId: string;
}
