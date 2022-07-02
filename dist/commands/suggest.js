"use strict";
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
const constants_1 = require("../lib/constants");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Create a suggestion.')
        .addStringOption((option) => option
        .setName('project')
        .setDescription('What project is your suggestion about?')
        .setRequired(true)
        .addChoices({ name: 'Discord Bot', value: 'Discord Bot' }, { name: 'Server', value: 'Server' })),
    async execute(interaction, client) {
        const project = interaction.options.getString('project');
        const suggestChannel = constants_1.Constants.Channels.SUGGESTIONS;
        if (!interaction.isCommand())
            return;
        const modal = new discord_js_1.Modal()
            .setCustomId('suggestionModal')
            .setTitle('Suggestion');
        const suggestionInput = new discord_js_1.TextInputComponent()
            .setCustomId('suggestionInput')
            .setLabel('Your suggestion')
            .setStyle('PARAGRAPH')
            .setRequired(true)
            .setMinLength(1);
        const otherInput = new discord_js_1.TextInputComponent()
            .setCustomId('otherInput')
            .setLabel('Any other information you want to share?')
            .setStyle('PARAGRAPH')
            .setMinLength(1)
            .setRequired(false);
        const firstActionRow = new discord_js_1.MessageActionRow().addComponents(suggestionInput);
        const secondActionRow = new discord_js_1.MessageActionRow().addComponents(otherInput);
        //@ts-ignore
        modal.addComponents(firstActionRow, secondActionRow);
        await interaction.showModal(modal);
        if (!interaction.isModalSubmit())
            return;
        if (interaction.customId === 'suggestionModal') {
            await interaction.reply({
                content: 'Your submission was recieved successfully!',
            });
        }
        const suggestion = interaction.fields.getTextInputValue('suggestionInput');
        const other = interaction.fields.getTextInputValue('otherInput');
        console.log(other, suggestion);
        const embed = new discord_js_1.MessageEmbed()
            .setColor(constants_1.Constants.Colors.DEFAULT)
            .setAuthor({
            name: `Suggestion from ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL(),
        })
            .setThumbnail(interaction.user.displayAvatarURL())
            .setDescription(`Project: ${project}`)
            .addFields({ name: 'Suggestion', value: suggestion }, { name: 'Other', value: other })
            .setTimestamp();
        const channel = client.channels.cache.get(suggestChannel);
        //@ts-ignore
        channel.send({ embeds: [embed] });
    },
};
