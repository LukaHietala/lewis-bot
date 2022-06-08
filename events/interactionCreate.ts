import { Client, MessageSelectMenu } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

export default (client: Client): void => {
    client.on('interactionCreate', async interaction => {
        const wait = require('node:timers/promises').setTimeout;
        if (!interaction.isSelectMenu()) return;
        if (interaction.customId === 'select') {
            await interaction.deferUpdate();
            await wait(500);
            await interaction.editReply({ content: `The role ${interaction.values} was selected.`, components: [] });
        }
    });
};
