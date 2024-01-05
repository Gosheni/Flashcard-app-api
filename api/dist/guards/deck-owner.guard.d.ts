import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { DecksService } from "src/decks/decks.service";
export declare class DeckOwnershipGuard implements CanActivate {
    private reflector;
    private deckService;
    constructor(reflector: Reflector, deckService: DecksService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
