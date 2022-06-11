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
const constants_1 = require("../lib/constants");
exports.default = (client) => {
    client.on('guildMemberAdd', (member) => __awaiter(void 0, void 0, void 0, function* () {
        if (!client.user || !client.application) {
            return console.error('Client user or application is undefined.');
        }
        const channel = constants_1.Constants.Channels.WELCOME;
        if (!channel)
            return console.log(constants_1.Constants['Errors'].NO_VALID_CHANNEL);
        const embed = new discord_js_1.MessageEmbed()
            .setColor(constants_1.Constants.Colors.DEFAULT)
            .setAuthor({
            name: member.user.tag,
            iconURL: member.user.displayAvatarURL(),
        })
            .setTitle('Thanks for joining!')
            .setDescription(`Welcome to the server! Use \`/role menu\` to get started. We would all love to get to know you in ${constants_1.Constants.Channels.WELCOME}!`);
        const channelToSend = member.guild.channels.cache.get(channel);
        channelToSend.send({
            content: `<@${member.user.id}>`,
            embeds: [embed],
        });
    }));
};
