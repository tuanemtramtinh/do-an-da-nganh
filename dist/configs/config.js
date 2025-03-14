"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    static instance;
    connectionString;
    constructor() {
        this.connectionString = process.env.MONGO_URL;
    }
    static getInstance() {
        if (!Database.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }
    async connect() {
        await mongoose_1.default.connect(this.connectionString, {
            authSource: 'admin',
            user: process.env.MONGO_USER,
            pass: process.env.MONGO_PASS
        });
        console.log('Kết nối database thành công');
    }
}
exports.Database = Database;
