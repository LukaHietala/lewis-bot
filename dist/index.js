'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const events_1 = __importDefault(require('./events/events'));
const discord_js_1 = require('discord.js');
const dotenv_1 = __importDefault(require('dotenv'));
const client_1 = __importDefault(require('./structures/client'));
const deploy_commands_1 = require('./deploy-commands');
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
    .filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path_1.default.join(commandsPath, file);
    const command = require(filePath);
    // @ts-ignore
    client_1.default.commands.set(command.data.name, command);
}
client_1.default.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    // @ts-ignore
    const command = client_1.default.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction, client_1.default);
    } catch (error) {
        embedError(error, interaction);
    }
    console.log(
        `${interaction.user.tag} used command ${interaction.commandName}`,
    );
});
//Initialize the events
(0, events_1.default)(client_1.default);
//deploy commands.
(0, deploy_commands_1.deployCommands)(clientId, guildId, token);
client_1.default.login(token);
