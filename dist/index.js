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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const events_1 = __importDefault(require("./events/events"));
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = __importDefault(require("./structures/client"));
const deploy_commands_1 = require("./deploy-commands");
dotenv_1.default.config();
const { embedError } = require('./modules/error');
const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;
// @ts-ignore
client_1.default.commands = new discord_js_1.Collection();
const commandsPath = path_1.default.join(__dirname, 'commands');
const commandFiles = fs_1.default
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.ts'));
for (const file of commandFiles) {
    const filePath = path_1.default.join(commandsPath, file);
    const command = require(filePath);
    // @ts-ignore
    client_1.default.commands.set(command.data.name, command);
}
client_1.default.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand())
        return;
    // @ts-ignore
    const command = client_1.default.commands.get(interaction.commandName);
    if (!command)
        return;
    try {
        yield command.execute(interaction, client_1.default);
    }
    catch (error) {
        embedError(error, interaction);
    }
    console.log(`${interaction.user.tag} used command ${interaction.commandName}`);
}));
//Initialize the events
(0, events_1.default)(client_1.default);
//deploy commands.
(0, deploy_commands_1.deployCommands)(clientId, guildId, token);
client_1.default.login(token);