"use strict";
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
async function deployCommands(clientId, guildId, token) {
    //Start refreshing the application commands.
    console.log('Started refreshing application (/) commands...');
    const commands = [];
    const commandsPath = path_1.default.join(__dirname, 'commands');
    const commandFiles = fs_1.default
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith('.ts' || '.js'));
    dotenv_1.default.config();
    //Push the commands to Discord API.
    for (const file of commandFiles) {
        const filePath = path_1.default.join(commandsPath, file);
        const command = require(filePath);
        commands.push(command.data.toJSON());
    }
    //We're using the REST to register application commands.
    const rest = new rest_1.REST({ version: '10' });
    await rest.setToken(token);
    await rest
        .put(v10_1.Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
    })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}
exports.deployCommands = deployCommands;
