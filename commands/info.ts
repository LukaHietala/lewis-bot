import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { Constants } from '../lib/constants';

export = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Information commands.')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('user')
                .setDescription('Information about a chosen user.')
                .addUserOption((option) =>
                    option
                        .setName('user')
                        .setDescription(
                            'Select the user to get information about.',
                        )
                        .setRequired(true),
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('server')
                .setDescription('Information about the server.'),
        ),
    async execute(interaction: CommandInteraction): Promise<void> {
        const command = interaction.options.getSubcommand();
        switch (command) {
            case 'user':
                const user = interaction.options.getUser('user');
                const embed = new MessageEmbed()
                    .setColor(Constants.Colors.DEFAULT)
                    .setAuthor({
                        name: `Information about ${user?.tag}`,
                        iconURL: user?.displayAvatarURL(),
                    })
                    .addFields(
                        {
                            // @ts-ignore
                            name: 'User ID',
                            value: user?.id,
                            inline: false,
                        },
                        {
                            name: 'User Tag',
                            value: user?.tag,
                            inline: false,
                        },
                        {
                            name: 'User Created At',
                            value: `<t:${user!.createdTimestamp}>`,
                            inline: false,
                        },
                    );
                interaction.reply({ embeds: [embed], ephemeral: true });
                break;
            case 'server':
                break;
            default:
                interaction.reply({
                    content: 'Not a valid command',
                    ephemeral: true,
                });
        }
    },
};
