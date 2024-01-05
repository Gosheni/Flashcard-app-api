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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsController = void 0;
const common_1 = require("@nestjs/common");
const cards_service_1 = require("./cards.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const card_create_dto_1 = require("./card-create.dto");
const user_id_decorator_1 = require("../decorators/user-id.decorator");
const find_cards_query_dto_1 = require("./find-cards-query.dto");
const card_update_dto_1 = require("./card-update.dto");
let CardsController = class CardsController {
    constructor(cardsService) {
        this.cardsService = cardsService;
    }
    async create(createCardDto, deckId, userId) {
        return await this.cardsService.create(createCardDto, deckId, userId);
    }
    async findAll(deckId, query) {
        const { limit, offset, search, withDeckData, withUserData } = query;
        const cards = await this.cardsService.findAll(limit, offset, deckId, undefined, search, withUserData, withDeckData);
        return {
            limit,
            offset,
            search,
            withUserData,
            withDeckData,
            data: cards.map((card) => {
                if (withUserData) {
                    delete card.user.password;
                }
                return card;
            }),
        };
    }
    async findOne(id) {
        const card = await this.cardsService.findOne(id);
        if (!card) {
            throw new common_1.NotFoundException(`Card with ID ${id} not found`);
        }
        delete card.userId;
        return card;
    }
    async update(id, cardUpdateDto, userId) {
        let card = await this.cardsService.findOne(id);
        if (!card) {
            throw new common_1.NotFoundException(`Card with ID ${id} not found`);
        }
        else if (card.userId !== userId) {
            throw new common_1.ForbiddenException();
        }
        card = await this.cardsService.update(id, cardUpdateDto);
        delete card.userId;
        return {
            statusCode: 200,
            message: "Card updated successfully",
            data: card,
        };
    }
    async remove(id, deckId, userId) {
        let card = await this.cardsService.findOne(id);
        if (!card) {
            throw new common_1.NotFoundException(`Card with ID ${id} not found`);
        }
        else if (card.userId !== userId) {
            throw new common_1.ForbiddenException();
        }
        card = await this.cardsService.remove(id, deckId);
        delete card.userId;
        return {
            statusCode: 200,
            message: "Card deleted successfully",
            data: card,
        };
    }
};
exports.CardsController = CardsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("deckId")),
    __param(2, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [card_create_dto_1.CreateCardDto, String, Number]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)("deckId")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, find_cards_query_dto_1.FindCardsQueryDto]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, card_update_dto_1.CardUpdateDto, Number]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("deckId")),
    __param(2, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "remove", null);
exports.CardsController = CardsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)("decks/:deckId/cards"),
    __metadata("design:paramtypes", [cards_service_1.CardsService])
], CardsController);
//# sourceMappingURL=cards.controller.js.map