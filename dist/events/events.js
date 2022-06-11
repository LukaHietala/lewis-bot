"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ready_1 = __importDefault(require("./ready"));
const guildMemberAdd_1 = __importDefault(require("./guildMemberAdd"));
exports.default = (client) => {
    (0, ready_1.default)(client);
    (0, guildMemberAdd_1.default)(client);
};
