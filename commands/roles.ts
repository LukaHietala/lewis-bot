import { Client } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Constants } from '../lib/constants';

export = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Sets your roles.')
        .addSubcommand((subcommand) =>
            subcommand.setName('menu').setDescription('Shows the role menu.'),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('info')
                .setDescription('Information about the server roles.'),
        ),
    async execute(interaction: any, client: Client) {
        interaction.reply({
            content: Constants.Errors.COMMAND_ON_DEVELOPMENT,
            ephemeral: true,
        });
    },
};
