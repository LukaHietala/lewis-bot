import { Client, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Constants } from '../lib/constants';

export = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Information about the bot.'),
    async execute(interaction: any, client: Client) {
        interaction.reply({
            content: 'Command is still in development.',
            ephemeral: true,
        });
    },
};