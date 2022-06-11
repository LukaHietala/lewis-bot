"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
const constants_1 = require("../lib/constants");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user from the server.')
        .addUserOption((option) => option
        .setName('user')
        .setDescription('Select the user to ban.')
        .setRequired(true))
        .addStringOption((option) => option
        .setName('reason')
        .setDescription('Reason for the ban.')
        .setRequired(false)),
    execute(interaction, client) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = interaction.member) === null || _a === void 0 ? void 0 : _a.permissions.has(discord_js_1.Permissions.FLAGS.BAN_MEMBERS))) {
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
                .setTitle('You have been banned from the server.')
                .setThumbnail(interaction.user.avatarURL())
                .setDescription('Ban appeals are coming later.')
                .addFields({
                name: 'User',
                value: `You were banned by ${interaction.user.tag}`,
                inline: true,
            }, { name: 'Reason', value: `${reason}`, inline: true })
                .setTimestamp();
            yield user.send({ embeds: [embed] });
            guild === null || guild === void 0 ? void 0 : guild.members.ban(user, { reason: reason });
            yield interaction.reply({
                content: `${user.tag} has been banned.`,
                ephemeral: true,
            });
        });
    },
};
