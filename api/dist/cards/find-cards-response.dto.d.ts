import { CardResponseDto } from "./card-response.dto";
export declare class FindCardsResponseDto {
    limit: number;
    offset: number;
    search?: string;
    withDeckData?: boolean;
    withUserData?: boolean;
    data: CardResponseDto[];
}
