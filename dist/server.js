"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const index_1 = __importDefault(require("./index"));
const index_2 = require("./config/index");
async function boostrap() {
    await (0, index_2.connectDatabase)();
    index_1.default.listen(index_2.env.PORT, () => {
        console.log(`
            🚀 Server running 
            🌍 Environment:${index_2.env.NODE_ENV}
            📡 Port: ${index_2.env.PORT}
            `);
    });
}
boostrap();
//# sourceMappingURL=server.js.map