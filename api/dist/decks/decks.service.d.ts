import { Repository } from "typeorm";
import { Deck } from "./deck.entity";
import { DeckCreateDto } from "./deck-create.dto";
import { DeckUpdateDto } from "./deck-update.dto";
export declare class DecksService {
    private deckRepository;
    constructor(deckRepository: Repository<Deck>);
    findAll(offset: number, limit: number, search?: string, userId?: number, withUserData?: boolean): Promise<Deck[]>;
    findOne(id: string, withUserData?: boolean): Promise<Deck | null>;
    create(deckCreateDto: DeckCreateDto, userId: number): Promise<Deck>;
    update(id: string, deckUpdateDto: DeckUpdateDto): Promise<Deck | null>;
    remove(id: string): Promise<Deck | null>;
    incrementCardCounter(id: string): Promise<Deck | null>;
    decrementCardCounter(id: string): Promise<Deck | null>;
}
