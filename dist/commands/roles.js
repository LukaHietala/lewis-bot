"use strict";
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('role')
        .setDescription('Sets your roles.')
        .addSubcommand((subcommand) => subcommand.setName('menu').setDescription('Shows the role menu.'))
        .addSubcommand((subcommand) => subcommand
        .setName('info')
        .setDescription('Information about the server roles.')),
    async execute(interaction) {
        const command = interaction.options.getSubcommand();
        //const channel = (interaction.channel) as TextChannel;
        const row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
            .setCustomId('language')
            .setPlaceholder('Select a programming language.')
            .setMinValues(1)
            .setMaxValues(9)
            .addOptions([
            {
                label: 'JavaScript',
                value: 'javascript',
            },
            {
                label: 'TypeScript',
                value: 'typescript',
            },
            {
                label: 'Python',
                value: 'python',
            },
            {
                label: 'C++',
                value: 'c++',
            },
            {
                label: 'C#',
                value: 'c#',
            },
            {
                label: 'C',
                value: 'c',
            },
            {
                label: 'Go',
                value: 'go',
            },
            {
                label: 'Rust',
                value: 'rust',
            },
            {
                label: 'Java',
                value: 'java',
            },
        ]));
        const rowOther = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
            .setCustomId('other')
            .setPlaceholder('Other roles.')
            .setMinValues(1)
            .setMaxValues(3)
            .addOptions([
            {
                label: 'Programmer',
                value: 'programmer',
            },
            {
                label: 'Designer',
                value: 'designer',
            },
            {
                label: 'Content Creator',
                value: 'content creator',
            },
        ]));
        if (command === 'menu') {
            await interaction.reply({
                components: [row, rowOther],
                ephemeral: true,
            });
        }
        if (command === 'info') {
            await interaction.reply({
                content: 'This is a list of roles that can be assigned to a user. NOT COMPLETE.',
                ephemeral: true,
            });
        }
    },
};
