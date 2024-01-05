"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const env_validation_1 = require("./env.validation");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("./auth/auth.service");
const passport_1 = require("@nestjs/passport");
const local_strategy_1 = require("./auth/local.strategy");
const user_entity_1 = require("./user/user.entity");
const user_service_1 = require("./user/user.service");
const user_controller_1 = require("./user/user.controller");
const jwt_1 = require("@nestjs/jwt");
const decks_module_1 = require("./decks/decks.module");
const jwt_strategy_1 = require("./auth/jwt.strategy");
const cards_module_1 = require("./cards/cards.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            config_1.ConfigModule.forRoot({
                validate: env_validation_1.validate,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: "postgres",
                    host: configService.get("DB_HOST"),
                    port: configService.get("DB_PORT"),
                    username: configService.get("DB_USER"),
                    password: configService.get("DB_PASSWORD"),
                    database: configService.get("DB_NAME"),
                    entities: [__dirname + "/**/*.entity{.ts,.js}"],
                    synchronize: configService.get("NODE_ENV") !== "production",
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get("JWT_SECRET"),
                    signOptions: {
                        expiresIn: configService.get("JWT_EXPIRATION"),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            decks_module_1.DecksModule,
            cards_module_1.CardsModule,
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController],
        providers: [app_service_1.AppService, auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, user_service_1.UserService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map