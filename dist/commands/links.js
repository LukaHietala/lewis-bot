"use strict";
const builders_1 = require("@discordjs/builders");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('links')
        .setDescription('Base links related to the bot')
        .addStringOption((option) => option
        .setName('link')
        .setDescription('Links')
        .setRequired(true)
        .addChoices({ name: 'Github', value: 'git' })),
    async execute(interaction) {
        const link = interaction.options.getString('link');
        switch (link) {
            case 'git':
                interaction.reply({
                    content: '[Github](https://github.com/LukaHietala/lewis-bot)',
                    ephemeral: true,
                });
                break;
            default:
                interaction.reply({
                    content: 'Not valid option',
                    ephemeral: true,
                });
                break;
        }
    },
};
