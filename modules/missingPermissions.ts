import { MessageEmbed } from 'discord.js';
import { Constants } from '../lib/constants';
export = {
    missingPermissions: function (interaction: any) {
        const embed = new MessageEmbed()
            .setTitle(`Something went wrong!`)
            .setColor(Constants.Colors.DEFAULT)
            .addField('Error', Constants.Errors.NO_PERMISSIONS)
            .setTimestamp();
        interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
