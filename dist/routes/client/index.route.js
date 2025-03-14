"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeClient = void 0;
const home_route_1 = __importDefault(require("./home.route"));
const calculate_route_1 = __importDefault(require("./calculate.route"));
const engine_route_1 = __importDefault(require("./engine.route"));
const routeClient = (app) => {
    app.use('/home', home_route_1.default);
    app.use('/calculate', calculate_route_1.default);
    app.use('/engine', engine_route_1.default);
    app.get('/', (req, res) => {
        res.json('Hello World');
    });
};
exports.routeClient = routeClient;
