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
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const amountMessagesToDelete = interaction.options.getInteger('amount');
            const guild = client.guilds.cache.get(interaction.guildId);
            const member = yield guild.members.fetch(interaction.user);
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
            const { size } = yield interaction.channel.bulkDelete(amountMessagesToDelete, true);
            yield interaction.reply({
                content: `Deleted ${size} message(s).`,
                ephemeral: true,
            });
        });
    },
};
