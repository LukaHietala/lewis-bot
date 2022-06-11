"use strict";
const discord_js_1 = require("discord.js");
const constants_1 = require("../lib/constants");
module.exports = {
    embedError: function (error, interaction) {
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(`Something went wrong!`)
            .setColor(constants_1.Constants.Colors.DEFAULT)
            .addField('Error', '```' + error + '```')
            .setTimestamp();
        interaction.channel.send({ embeds: [embed] });
    },
};
