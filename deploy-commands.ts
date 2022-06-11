import fs from 'fs';
import path from 'path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import dotenv from 'dotenv';

export function deployCommands(
    clientId: string,
    guildId: string,
    token: string,
): void {
    //Start refreshing the application commands.
    console.log('Started refreshing application (/) commands...');
    const commands: object[] = [];
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file: string) => file.endsWith('.ts'));
    dotenv.config();

    //Push the commands to Discord API.
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        commands.push(command.data.toJSON());
    }

    //We're using the REST to register application commands.
    const rest = new REST({ version: '10' });
    rest.setToken(token as string);
    rest.put(
        Routes.applicationGuildCommands(clientId as string, guildId as string),
        {
            body: commands,
        },
    )
        .then(() =>
            console.log('Successfully registered application commands.'),
        )
        .catch(console.error);
}
