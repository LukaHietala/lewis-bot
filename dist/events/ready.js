"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('Starting...');
exports.default = (client) => {
    client.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
        if (!client.user || !client.application) {
            return console.error('Client user or application is undefined.');
        }
        client.user.setActivity("the Lewis server.", {
            type: "WATCHING" //,
            //url: "https://www.twitch.tv/example-url" only needed if the status is 'STREAMING'
        });
        console.log(`${client.user.tag} is ready.`);
    }));
};
