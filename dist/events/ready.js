"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('Starting...');
console.log('Connecting to the database...');
exports.default = (client) => {
    client.on('ready', async () => {
        await mongoose_1.default
            .connect(process.env.MONGO_URI, {
            keepAlive: true,
        })
            .then(() => console.log('Connected to MongoDB!'));
        if (!client.user || !client.application) {
            return console.error('Client user or application is undefined.');
        }
        client.user.setActivity('the Lewis server.', {
            type: 'WATCHING', //,
            //url: "https://www.twitch.tv/example-url" only needed if the status is 'STREAMING'
        });
        console.log(`${client.user.tag} is ready.`);
    });
};
