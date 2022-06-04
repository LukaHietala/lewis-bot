import { Client, ClientUser, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Constants } from '../lib/constants';

export = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction: any, client: Client) {
        interaction.reply({ content: ' Pong!', ephemeral: true });
    },
};
