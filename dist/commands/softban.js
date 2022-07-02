"use strict";
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const constants_1 = require("../lib/constants");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('softban')
        .setDescription('Softbans a chosen user.')
        .addUserOption((option) => option
        .setName('user')
        .setDescription('Select the user to ban.')
        .setRequired(true)),
    async execute(interaction, client) {
        if (!interaction.member?.permissions.has(discord_js_1.Permissions.FLAGS.BAN_MEMBERS)) {
            return interaction.reply({
                content: constants_1.Constants['Errors'].NO_PERMISSIONS,
                ephemeral: true,
            });
        }
        const guild = client.guilds.cache.get(interaction.guildId);
        const user = interaction.options.getUser('user');
        if (user.bot || user.id === interaction.user.id) {
            return interaction.reply({
                content: constants_1.Constants['Errors'].NOT_VALID_USER,
                ephemeral: true,
            });
        }
        const embed = new discord_js_1.MessageEmbed()
            .setColor(constants_1.Constants.Colors.DEFAULT)
            .setTitle('You have been softbanned from the server.')
            .setThumbnail(interaction.user.avatarURL())
            .setDescription('You can join the server again.')
            .addFields({
            name: 'User',
            value: `You were softbanned by ${interaction.user.tag}`,
            inline: true,
        })
            .setTimestamp();
        await user.send({ embeds: [embed] });
        guild?.members.ban(user);
        await interaction.reply({
            content: `${user.tag} has been softbanned.`,
            ephemeral: true,
        });
        await guild?.members.unban(user.id);
    },
};
