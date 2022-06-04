import {
    MessageEmbed,
    BaseCommandInteraction,
    Client,
    Permissions,
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Constants } from '../lib/constants';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user from the server.')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('Select the user to ban.')
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName('reason')
                .setDescription('Reason for the ban.')
                .setRequired(false),
        ),
    async execute(interaction: BaseCommandInteraction | any, client: Client) {
        if (
            !interaction.member?.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
        ) {
            return interaction.reply({
                content: Constants['Errors'].NO_PERMISSIONS,
                ephemeral: true,
            });
        }
        const guild = client.guilds.cache.get(Constants.Guilds.MAIN);
        const user = interaction.options.getUser('user');
        let reason = interaction.options.getString('reason');
        const banned = await client.users.fetch(user.id);
        if (user!.bot || user!.id === interaction.user.id) {
            return interaction.reply({
                content: Constants['Errors'].NOT_VALID_USER,
                ephemeral: true,
            });
        }
        if (reason === null) {
            reason = 'No reason provided.';
        }
        const embed = new MessageEmbed()
            .setColor(Constants.Colors.DEFAULT)
            .setTitle('You have been banned from the server.')
            .setThumbnail(interaction.user.avatarURL())
            .setDescription('Ban appeals are coming later.')
            .addFields(
                {
                    name: 'User',
                    value: `You were banned by ${interaction.user.tag}`,
                    inline: true,
                },
                { name: 'Reason', value: `${reason}`, inline: true },
            )
            .setTimestamp();
        await user.send({ embeds: [embed] });
        guild?.members.ban(user, { reason: reason });
        await interaction.reply({
            content: `${user.tag} has been banned.`,
            ephemeral: true,
        });
    },
};
