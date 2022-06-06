import { Client, ClientUser, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Constants } from '../lib/constants';

export = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with the bot and API ping!'),
    async execute(interaction: any, client: Client) {

        const msg = await interaction.channel.send('Done!');

        const latency = msg.createdTimestamp - interaction.createdTimestamp;

        await interaction.reply({ content: `**Bot Latency**: \`${latency}ms\`, **API Latency**: \`${Math.round(client.ws.ping)}ms\``, ephemeral: false });
    },
};
