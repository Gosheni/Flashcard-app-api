import { Card } from "src/cards/card.entity";
import { User } from "src/user/user.entity";
export declare class Deck {
    id: string;
    title: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    numCards: number;
    user: User;
    userId: number;
    cards: Card[];
}
