"use strict";
const builders_1 = require("@discordjs/builders");
const constants_1 = require("../lib/constants");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('report')
        .setDescription('Report')
        .addSubcommand((subcommand) => subcommand
        .setName('user')
        .setDescription('Report a user.')
        .addUserOption((option) => option
        .setName('user')
        .setDescription('User to report.')
        .setRequired(true))
        .addStringOption((option) => option
        .setName('reason')
        .setDescription('Reason for report.')
        .setRequired(true)))
        .addSubcommand((subcommand) => subcommand
        .setName('bug')
        .setDescription('Report a bug.')
        .addStringOption((option) => option
        .setName('bug')
        .setDescription('Bug to report.')
        .setRequired(true))),
    async execute(interaction) {
        const command = interaction.options.getSubcommand();
        switch (command) {
            case 'user':
                //const user = interaction.options.getUser('user');
                //const reason = interaction.options.getString('reason');
                interaction.reply({
                    content: constants_1.Constants.Errors.COMMAND_ON_DEVELOPMENT,
                    ephemeral: true,
                });
                break;
            case 'bug':
                //const bug = interaction.options.getString('bug');
                interaction.reply({
                    content: constants_1.Constants.Errors.COMMAND_ON_DEVELOPMENT,
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
