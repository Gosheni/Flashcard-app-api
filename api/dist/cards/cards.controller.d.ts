import { CardsService } from "./cards.service";
import { CardResponseDto } from "./card-response.dto";
import { CreateCardDto } from "./card-create.dto";
import { FindCardsQueryDto } from "./find-cards-query.dto";
import { FindCardsResponseDto } from "./find-cards-response.dto";
import { CardUpdateDto } from "./card-update.dto";
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    create(createCardDto: CreateCardDto, deckId: string, userId: number): Promise<CardResponseDto>;
    findAll(deckId: string, query: FindCardsQueryDto): Promise<FindCardsResponseDto>;
    findOne(id: string): Promise<CardResponseDto>;
    update(id: string, cardUpdateDto: CardUpdateDto, userId: number): Promise<{
        statusCode: number;
        message: string;
        data: CardResponseDto;
    }>;
    remove(id: string, deckId: string, userId: number): Promise<{
        statusCode: number;
        message: string;
        data: CardResponseDto;
    }>;
}
