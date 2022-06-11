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
const constants_1 = require("../lib/constants");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            interaction.reply({
                content: `${constants_1.Constants['Emojis'].LOADING} Pinging...`,
            });
            const ms = require('ms');
            const pingEmbed = new discord_js_1.MessageEmbed()
                .setColor(constants_1.Constants.Colors.DEFAULT)
                .setAuthor({ name: 'Ping!' })
                .setDescription('Client, and Websocket Ping.')
                .addFields({
                name: `${constants_1.Constants['Emojis'].CONNECTION} Client Ping`,
                value: '```> ' +
                    `${Date.now() - interaction.createdTimestamp}.00ms` +
                    '```',
                inline: true,
            }, {
                name: `${constants_1.Constants['Emojis'].CONNECTION} API Ping`,
                value: '```> ' + `${Math.round(client.ws.ping)}.00ms` + '```',
                inline: true,
            }, {
                name: `Uptime`,
                value: '```> ' +
                    `${ms(client.uptime, { long: false })}` +
                    '```',
                inline: true,
            });
            yield interaction.deleteReply();
            yield interaction.channel.send({
                embeds: [pingEmbed],
            });
        });
    },
};
