"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const http_response_filter_1 = require("./filters/http-response.filter");
const http_response_interceptor_1 = require("./interceptors/http-response.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: {
            origin: process.env.CLIENT_URL,
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalFilters(new http_response_filter_1.HttpResponseFilter());
    app.useGlobalInterceptors(new http_response_interceptor_1.HttpResponseInterceptor());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map