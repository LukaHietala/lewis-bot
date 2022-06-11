import fs from 'fs';
import path from 'path';
import events from './events/events';
import { Collection } from 'discord.js';
import dotenv from 'dotenv';
import client from './structures/client';
import { deployCommands } from './deploy-commands';

dotenv.config();

const { embedError } = require('./modules/error');

const guildId = process.env.GUILD_ID as string;
const clientId = process.env.CLIENT_ID as string;
const token = process.env.TOKEN as string;
// @ts-ignore
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.ts'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // @ts-ignore
    client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    // @ts-ignore
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction, client);
    } catch (error) {
        embedError(error, interaction);
    }

    console.log(
        `${interaction.user.tag} used command ${interaction.commandName}`,
    );
});
//Initialize the events
events(client);
//deploy commands.
deployCommands(clientId, guildId, token);

client.login(token);
