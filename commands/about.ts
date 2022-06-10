import { SlashCommandBuilder } from '@discordjs/builders';

export = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Information about the bot.'),
    async execute(interaction: any) {
        interaction.reply({
            content: 'Command is still in development.',
            ephemeral: true,
        });
    },
};