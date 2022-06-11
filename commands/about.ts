import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Information about the bot.'),
    async execute(interaction: CommandInteraction<'cached'>): Promise<void> {
        interaction.reply({
            content: 'Command is still in development.',
            ephemeral: true,
        });
    },
};
