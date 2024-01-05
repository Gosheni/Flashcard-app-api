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
exports.CardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const card_entity_1 = require("./card.entity");
const typeorm_2 = require("@nestjs/typeorm");
const decks_service_1 = require("../decks/decks.service");
let CardsService = class CardsService {
    constructor(cardRepository, decksService) {
        this.cardRepository = cardRepository;
        this.decksService = decksService;
    }
    async create(createCardDto, deckId, userId) {
        const card = this.cardRepository.create({
            ...createCardDto,
            deckId,
            userId,
        });
        await this.decksService.incrementCardCounter(deckId);
        return this.cardRepository.save(card);
    }
    async findAll(limit, offset, deckId, userId, search, withUserData, withDeckData) {
        const front = search ? (0, typeorm_1.ILike)(`%${search}%`) : undefined;
        const back = search ? (0, typeorm_1.ILike)(`%${search}%`) : undefined;
        const relations = [];
        if (withUserData) {
            relations.push("user");
        }
        if (withDeckData) {
            relations.push("deck");
        }
        const cards = await this.cardRepository.find({
            take: limit,
            skip: offset,
            where: [
                {
                    deckId,
                    userId,
                    front,
                    back,
                },
            ],
            order: {
                createdAt: "DESC",
            },
            relations,
        });
        return cards;
    }
    async findOne(id) {
        return this.cardRepository.findOneBy({ id });
    }
    async update(id, cardUpdateDto) {
        const card = await this.cardRepository.preload({ id, ...cardUpdateDto });
        if (!card) {
            return null;
        }
        card.updatedAt = new Date();
        return this.cardRepository.save(card);
    }
    async remove(id, deckId) {
        const card = await this.findOne(id);
        if (!card) {
            return null;
        }
        await this.decksService.decrementCardCounter(deckId);
        return this.cardRepository.remove(card);
    }
};
exports.CardsService = CardsService;
exports.CardsService = CardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(card_entity_1.Card)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        decks_service_1.DecksService])
], CardsService);
//# sourceMappingURL=cards.service.js.map