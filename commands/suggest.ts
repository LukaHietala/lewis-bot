import { Client, ClientUser, MessageEmbed} from 'discord.js';
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
                .addChoices({
                    name: 'Reddit Bot', value: 'Reddit Bot' //If needed, multiple projects can be added.
                })
        )
        .addStringOption((option) =>
            option
                .setName('suggestion')
                .setDescription('What is your suggestion?')
                .setRequired(true),
        ),
    async execute(interaction: any, client: Client) {

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
                { name: 'Suggested by:', value: `${interaction.user}`, inline: false },
            )
            .setTimestamp();
        await interaction.reply('Your suggestion has been sent to the relevant dev team!');
        await interaction.guild.channels.cache.get(suggestChannel).send({ embeds: [embed] });
    },
};