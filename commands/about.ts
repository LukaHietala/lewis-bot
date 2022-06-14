import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction, MessageEmbed } from 'discord.js';
import { Constants } from '../lib/constants';

export = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Information about the bot.'),
    async execute(
        interaction: CommandInteraction<'cached'>,
        client: Client,
    ): Promise<void> {
        const embed = new MessageEmbed()
            .setColor(Constants.Colors.DEFAULT)
            .setAuthor({
                name: 'Information about the bot.',
                iconURL: client.user!.avatarURL()!,
            })
            .setThumbnail(client.user!.avatarURL()!)
            .setDescription(
                `More information coming soon!\n\n Github: https://github.com/LukaHietala/lewis-bot`,
            );

        interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    },
};
