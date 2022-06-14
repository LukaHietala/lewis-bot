import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { Constants } from '../lib/constants';

export = {
    data: new SlashCommandBuilder()
        .setName('client')
        .setDescription('Base client information and commands.')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('info')
                .setDescription('Information about the client.'),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('emit')
                .setDescription('Emit an event.')
                .addStringOption((option) =>
                    option
                        .setName('event')
                        .setDescription('Select the event to emit.')
                        .setRequired(true),
                )
                .addStringOption((option) =>
                    option
                        .setName('data')
                        .setDescription('Select the data to emit.')
                        .setRequired(true),
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('eval')
                .setDescription('Evaluate a code snippet.')
                .addStringOption((option) =>
                    option
                        .setName('code')
                        .setDescription('Select the code to evaluate.')
                        .setRequired(true),
                ),
        ),
    async execute(interaction: CommandInteraction): Promise<void> {
        const command = interaction.options.getSubcommand();
        switch (command) {
            case 'info':
                interaction.reply({
                    content: Constants.Errors.COMMAND_ON_DEVELOPMENT,
                    ephemeral: true,
                });
                break;
            case 'emit':
                interaction.reply({
                    content: Constants.Errors.COMMAND_ON_DEVELOPMENT,
                    ephemeral: true,
                });
                break;
            case 'eval':
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
