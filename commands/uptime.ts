import { Client } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Replies with the bot uptime!'),
    async execute(interaction: any, client: Client) {
        const ms = require('ms');
        interaction.reply({ content: `My current **uptime** is \`${ms(client.uptime, { long: true })}\``, ephemeral: true });
    },
};