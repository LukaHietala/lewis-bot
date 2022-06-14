import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { Constants } from '../lib/constants';

export = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Report')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('user')
                .setDescription('Report a user.')
                .addUserOption((option) =>
                    option
                        .setName('user')
                        .setDescription('User to report.')
                        .setRequired(true),
                )
                .addStringOption((option) =>
                    option
                        .setName('reason')
                        .setDescription('Reason for report.')
                        .setRequired(true),
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('bug')
                .setDescription('Report a bug.')
                .addStringOption((option) =>
                    option
                        .setName('bug')
                        .setDescription('Bug to report.')
                        .setRequired(true),
                ),
        ),
    async execute(interaction: CommandInteraction<'cached'>): Promise<void> {
        const command = interaction.options.getSubcommand();
        switch (command) {
            case 'user':
                //const user = interaction.options.getUser('user');
                //const reason = interaction.options.getString('reason');
                interaction.reply({
                    content: Constants.Errors.COMMAND_ON_DEVELOPMENT,
                    ephemeral: true,
                });
                break;
            case 'bug':
                //const bug = interaction.options.getString('bug');
                interaction.reply({
                    content: Constants.Errors.COMMAND_ON_DEVELOPMENT,
                    ephemeral: true,
                });
                break;
            default:
                return interaction.reply({
                    content: 'Invalid arguments.',
                    ephemeral: true,
                });
        }
    },
};
