import { Repository } from "typeorm";
import { Card } from "./card.entity";
import { CreateCardDto } from "./card-create.dto";
import { DecksService } from "src/decks/decks.service";
import { CardUpdateDto } from "./card-update.dto";
export declare class CardsService {
    private readonly cardRepository;
    private readonly decksService;
    constructor(cardRepository: Repository<Card>, decksService: DecksService);
    create(createCardDto: CreateCardDto, deckId: string, userId: number): Promise<Card>;
    findAll(limit: number, offset: number, deckId?: string, userId?: number, search?: string, withUserData?: boolean, withDeckData?: boolean): Promise<Card[]>;
    findOne(id: string): Promise<Card | null>;
    update(id: string, cardUpdateDto: CardUpdateDto): Promise<Card | null>;
    remove(id: string, deckId: string): Promise<Card | null>;
}
