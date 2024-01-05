import { UserResponseDto } from "src/user/user-response.dto";
export declare class DeckResponseDto {
    id: string;
    title: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
    numCards: number;
    user?: UserResponseDto;
}
