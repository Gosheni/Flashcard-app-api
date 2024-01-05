import { DecksService } from "./decks.service";
import { DeckCreateDto } from "./deck-create.dto";
import { DeckUpdateDto } from "./deck-update.dto";
import { DeckResponseDto } from "./deck-response.dto";
import { UserService } from "src/user/user.service";
import { FindDecksQueryDto } from "./find-decks-query.dto";
import { FindDecksResponseDto } from "./find-decks-response.dto";
export declare class DecksController {
    private readonly decksService;
    private readonly userService;
    constructor(decksService: DecksService, userService: UserService);
    findAll(loginUserId: number, query: FindDecksQueryDto): Promise<FindDecksResponseDto>;
    findOne(id: string, withUserData?: boolean): Promise<DeckResponseDto>;
    create(deckCreateDto: DeckCreateDto, userId: number): Promise<DeckResponseDto>;
    update(id: string, deckUpdateDto: DeckUpdateDto, userId: number): Promise<{
        statusCode: number;
        message: string;
        data: DeckResponseDto;
    }>;
    remove(id: string, userId: number): Promise<{
        statusCode: number;
        message: string;
        data: DeckResponseDto;
    }>;
}
