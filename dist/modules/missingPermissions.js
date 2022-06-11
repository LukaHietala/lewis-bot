"use strict";
const discord_js_1 = require("discord.js");
const constants_1 = require("../lib/constants");
module.exports = {
    missingPermissions: function (interaction) {
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(`Something went wrong!`)
            .setColor(constants_1.Constants.Colors.DEFAULT)
            .addField('Error', constants_1.Constants.Errors.NO_PERMISSIONS)
            .setTimestamp();
        interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
