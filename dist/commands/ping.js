"use strict";
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
const constants_1 = require("../lib/constants");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction, client) {
        interaction.reply({
            content: `${constants_1.Constants['Emojis'].LOADING} Pinging...`,
        });
        const ms = require('ms');
        const ping = Date.now() - interaction.createdTimestamp;
        const pingEmbed = new discord_js_1.MessageEmbed()
            .setColor(constants_1.Constants.Colors.DEFAULT)
            .setAuthor({ name: 'Ping!' })
            .setDescription('Client, and Websocket Ping.')
            .addFields({
            name: `${constants_1.Constants['Emojis'].CONNECTION} Client Ping`,
            value: '```> ' +
                `${ping.toString().replace('-', '')}.00ms` +
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
        await interaction.deleteReply();
        await interaction.channel.send({
            embeds: [pingEmbed],
        });
    },
};
