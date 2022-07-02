"use strict";
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear large amounts of messages.')
        .addIntegerOption((option) => option
        .setName('amount')
        .setDescription('Amount of messages to delete.')
        .setRequired(true)),
    async execute(interaction, client) {
        const amountMessagesToDelete = interaction.options.getInteger('amount');
        const guild = client.guilds.cache.get(interaction.guildId);
        const member = await guild.members.fetch(interaction.user);
        if (!member.permissions.has(discord_js_1.Permissions.FLAGS.MANAGE_MESSAGES))
            return interaction.reply({
                content: 'You do not have permission clear messages.',
                ephemeral: true,
            });
        if (!amountMessagesToDelete) {
            return interaction.reply({
                content: 'Please specify the amount of messages to delete.',
                ephemeral: true,
            });
        }
        if (amountMessagesToDelete > 100) {
            return interaction.reply({
                content: 'You cannot delete more than 100 messages at a time.',
                ephemeral: true,
            });
        }
        if (amountMessagesToDelete < 1) {
            return interaction.reply({
                content: 'You cannot delete less than 1 message.',
                ephemeral: true,
            });
        }
        const { size } = await interaction.channel.bulkDelete(amountMessagesToDelete, true);
        await interaction.reply({
            content: `Deleted ${size} message(s).`,
            ephemeral: true,
        });
    },
};
