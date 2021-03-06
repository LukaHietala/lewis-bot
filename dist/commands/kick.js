"use strict";
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
const constants_1 = require("../lib/constants");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server.')
        .addUserOption((option) => option
        .setName('user')
        .setDescription('Select the user to kick.')
        .setRequired(true))
        .addStringOption((option) => option
        .setName('reason')
        .setDescription('Reason for the kick.')
        .setRequired(false)),
    async execute(interaction, client) {
        if (!interaction.member?.permissions.has(discord_js_1.Permissions.FLAGS.KICK_MEMBERS)) {
            return interaction.reply({
                content: constants_1.Constants['Errors'].NO_PERMISSIONS,
                ephemeral: true,
            });
        }
        const guild = client.guilds.cache.get(interaction.guildId);
        const user = interaction.options.getUser('user');
        let reason = interaction.options.getString('reason');
        if (user.bot || user.id === interaction.user.id) {
            return interaction.reply({
                content: constants_1.Constants['Errors'].NOT_VALID_USER,
                ephemeral: true,
            });
        }
        if (reason === null) {
            reason = 'No reason provided.';
        }
        const embed = new discord_js_1.MessageEmbed()
            .setColor(constants_1.Constants.Colors.DEFAULT)
            .setTitle('You have been kicked from the server.')
            .setThumbnail(interaction.user.avatarURL())
            .addFields({
            name: 'User',
            value: `You were kicked by ${interaction.user.tag}`,
            inline: true,
        }, { name: 'Reason', value: `${reason}`, inline: true })
            .setTimestamp();
        await user.send({ embeds: [embed] });
        guild?.members.kick(user);
        await interaction.reply({
            content: `${user.tag} has been kicked.`,
            ephemeral: true,
        });
    },
};
