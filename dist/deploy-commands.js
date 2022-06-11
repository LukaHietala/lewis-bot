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
exports.deployCommands = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const rest_1 = require("@discordjs/rest");
const v10_1 = require("discord-api-types/v10");
const dotenv_1 = __importDefault(require("dotenv"));
function deployCommands(clientId, guildId, token) {
    return __awaiter(this, void 0, void 0, function* () {
        //Start refreshing the application commands.
        console.log('Started refreshing application (/) commands...');
        const commands = [];
        const commandsPath = path_1.default.join(__dirname, 'commands');
        const commandFiles = fs_1.default
            .readdirSync(commandsPath)
            .filter((file) => file.endsWith('.ts'));
        dotenv_1.default.config();
        //Push the commands to Discord API.
        for (const file of commandFiles) {
            const filePath = path_1.default.join(commandsPath, file);
            const command = require(filePath);
            commands.push(command.data.toJSON());
        }
        //We're using the REST to register application commands.
        const rest = new rest_1.REST({ version: '10' });
        yield rest.setToken(token);
        yield rest
            .put(v10_1.Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        })
            .then(() => console.log('Successfully registered application commands.'))
            .catch(console.error);
    });
}
exports.deployCommands = deployCommands;
