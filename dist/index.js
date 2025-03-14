"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_route_1 = require("./routes/client/index.route");
const config_1 = require("./configs/config");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const main = async () => {
    await config_1.Database.getInstance().connect();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    (0, index_route_1.routeClient)(app);
    app.listen(port, () => {
        console.log('App listening on port', port);
    });
};
main();
