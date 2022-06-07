import { Client, ClientUser, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Constants } from '../lib/constants';

export = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction: any, client: Client) {

        const msg = await interaction.reply({content: 'Pinging...', ephemeral: true });

        const latency = msg.createdTimestamp - interaction.createdTimestamp;

        await interaction.editReply({ content: `**Bot Latency**: \`${latency}ms\`, **API Latency**: \`${Math.round(client.ws.ping)}ms\``, ephemeral: true });
    },
};
