import { Client, MessageEmbed, TextChannel } from 'discord.js';
import { Constants } from '../lib/constants';

export default (client: Client): void => {
    client.on('guildMemberAdd', async (member) => {
        if (!client.user || !client.application) {
            return console.error('Client user or application is undefined.');
        }
        const channel = Constants.Channels.WELCOME;
        if (!channel) return console.log(Constants['Errors'].NO_VALID_CHANNEL);
        const embed = new MessageEmbed()
            .setColor(Constants.Colors.DEFAULT)
            .setAuthor({
                name: member.user.tag,
                iconURL: member.user.displayAvatarURL(),
            })
            .setTitle('Thanks for joining!')
            .setDescription(
                `Welcome to the server! Use \`/role menu\` to get started. We would all love to get to know you in ${Constants.Channels.WELCOME}!`,
            );
        const channelToSend = member.guild.channels.cache.get(
            channel,
        ) as TextChannel;
        channelToSend.send({
            content: `<@${member.user.id}>`,
            embeds: [embed],
        });
    });
};
