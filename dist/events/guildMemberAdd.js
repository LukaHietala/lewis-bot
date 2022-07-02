"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const constants_1 = require("../lib/constants");
exports.default = (client) => {
    client.on('guildMemberAdd', async (member) => {
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
    });
};
