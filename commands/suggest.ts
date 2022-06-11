import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Constants } from '../lib/constants';

export = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Lets you make a suggestion to the relevant dev!')
        .addStringOption((option) =>
            option
                .setName('project')
                .setDescription('What project is your suggestion about?')
                .setRequired(true)
                .addChoices(
                    { name: 'Discord Bot', value: 'Discord Bot' },
                    { name: 'Server', value: 'Server' },
                ),
        )
        .addStringOption((option) =>
            option
                .setName('suggestion')
                .setDescription('What is your suggestion?')
                .setRequired(true),
        ),
    async execute(interaction: any): Promise<void> {
        const user = interaction.user.id;
        const project = interaction.options.getString('project');
        const suggestion = interaction.options.getString('suggestion');
        const suggestChannel = Constants.Channels.SUGGESTIONS;

        if (user!.bot || user!.id === interaction.user.id) {
            return interaction.reply({
                content: Constants['Errors'].NOT_VALID_USER,
                ephemeral: true,
            });
        }

        const embed = new MessageEmbed()
            .setColor(Constants.Colors.DEFAULT)
            .setTitle('New Suggestion')
            .setThumbnail(interaction.user.avatarURL())
            .addFields(
                {
                    name: 'Project',
                    value: `${project}`,
                    inline: true,
                },
                { name: 'Suggestion', value: `${suggestion}`, inline: true },
                {
                    name: 'Suggested by:',
                    value: `${interaction.user}`,
                    inline: false,
                },
            )
            .setTimestamp();
        await interaction.reply({
            content: 'Your suggestion has been sent!',
            ephemeral: true,
        });
        await interaction.guild.channels.cache
            .get(suggestChannel)
            .send({ embeds: [embed] });
    },
};
