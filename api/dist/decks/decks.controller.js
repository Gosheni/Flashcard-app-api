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
exports.DecksController = void 0;
const common_1 = require("@nestjs/common");
const user_id_decorator_1 = require("../decorators/user-id.decorator");
const decks_service_1 = require("./decks.service");
const deck_create_dto_1 = require("./deck-create.dto");
const deck_update_dto_1 = require("./deck-update.dto");
const common_2 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const deck_owner_guard_1 = require("../guards/deck-owner.guard");
const user_service_1 = require("../user/user.service");
const find_decks_query_dto_1 = require("./find-decks-query.dto");
let DecksController = class DecksController {
    constructor(decksService, userService) {
        this.decksService = decksService;
        this.userService = userService;
    }
    async findAll(loginUserId, query) {
        const { limit, offset, search, username, withUserData } = query;
        let userId;
        if (username) {
            const user = await this.userService.findOne(username);
            if (!user) {
                throw new common_1.NotFoundException(`User with username ${username} not found`);
            }
            userId = user.id;
        }
        const decks = await this.decksService.findAll(offset, limit, search, userId, withUserData);
        const filteredDecks = decks.filter((deck) => deck.userId === loginUserId);
        return {
            limit,
            offset,
            search,
            username,
            withUserData,
            data: filteredDecks.map((deck) => {
                delete deck.userId;
                if (deck.user) {
                    delete deck.user.password;
                }
                return deck;
            }),
        };
    }
    async findOne(id, withUserData) {
        const deck = await this.decksService.findOne(id, withUserData);
        if (!deck) {
            throw new common_1.NotFoundException(`Deck with ID ${id} not found`);
        }
        delete deck.userId;
        if (withUserData) {
            delete deck.user.password;
        }
        return deck;
    }
    async create(deckCreateDto, userId) {
        const deck = await this.decksService.create(deckCreateDto, userId);
        delete deck.userId;
        return deck;
    }
    async update(id, deckUpdateDto, userId) {
        let deck = await this.decksService.findOne(id);
        if (!deck) {
            throw new common_1.NotFoundException(`Deck with ID ${id} not found`);
        }
        else if (deck.userId !== userId) {
            throw new common_1.ForbiddenException();
        }
        deck = await this.decksService.update(id, deckUpdateDto);
        delete deck.userId;
        return {
            statusCode: 200,
            message: "Deck updated successfully",
            data: deck,
        };
    }
    async remove(id, userId) {
        let deck = await this.decksService.findOne(id);
        if (!deck) {
            throw new common_1.NotFoundException(`Deck with ID ${id} not found`);
        }
        else if (deck.userId !== userId) {
            throw new common_1.ForbiddenException();
        }
        deck = await this.decksService.remove(id);
        delete deck.userId;
        return {
            statusCode: 200,
            message: "Deck deleted successfully",
            data: deck,
        };
    }
};
exports.DecksController = DecksController;
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, user_id_decorator_1.UserId)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, find_decks_query_dto_1.FindDecksQueryDto]),
    __metadata("design:returntype", Promise)
], DecksController.prototype, "findAll", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, deck_owner_guard_1.DeckOwnershipGuard),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)("withUserData")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], DecksController.prototype, "findOne", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deck_create_dto_1.DeckCreateDto, Number]),
    __metadata("design:returntype", Promise)
], DecksController.prototype, "create", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, deck_owner_guard_1.DeckOwnershipGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, deck_update_dto_1.DeckUpdateDto, Number]),
    __metadata("design:returntype", Promise)
], DecksController.prototype, "update", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, deck_owner_guard_1.DeckOwnershipGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], DecksController.prototype, "remove", null);
exports.DecksController = DecksController = __decorate([
    (0, common_1.Controller)("decks"),
    __metadata("design:paramtypes", [decks_service_1.DecksService,
        user_service_1.UserService])
], DecksController);
//# sourceMappingURL=decks.controller.js.map