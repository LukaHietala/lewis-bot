import { MessageEmbed } from 'discord.js';
import { Constants } from '../lib/constants';

export = {
    embedError: function (error: any, interaction: any) {
        const embed = new MessageEmbed()
            .setTitle(`Something went wrong!`)
            .setColor(Constants.Colors.DEFAULT)
            .addField('Error', '```' + error + '```')
            .setTimestamp();
        interaction.channel.send({ embeds: [embed] });
    },
};
