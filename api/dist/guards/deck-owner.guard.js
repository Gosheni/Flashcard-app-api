"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeckOwnershipGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const decks_service_1 = require("../decks/decks.service");
let DeckOwnershipGuard = class DeckOwnershipGuard {
    constructor(reflector, deckService) {
        this.reflector = reflector;
        this.deckService = deckService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userId = user.userId;
        const deckId = request.params.id;
        if (!deckId) {
            throw new common_1.BadRequestException("Invalid or missing deck ID");
        }
        const deck = await this.deckService.findOne(deckId);
        if (!deck) {
            throw new common_1.NotFoundException(`deck with ID ${deckId} not found`);
        }
        return deck.userId == userId;
    }
};
exports.DeckOwnershipGuard = DeckOwnershipGuard;
exports.DeckOwnershipGuard = DeckOwnershipGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        decks_service_1.DecksService])
], DeckOwnershipGuard);
//# sourceMappingURL=deck-owner.guard.js.map