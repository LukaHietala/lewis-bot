import {
    MessageEmbed,
    Client,
    Permissions,
    CommandInteraction,
    UserResolvable,
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Constants } from '../lib/constants';

export = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server.')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('Select the user to kick.')
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName('reason')
                .setDescription('Reason for the kick.')
                .setRequired(false),
        ),
    async execute(
        interaction: CommandInteraction<'cached'>,
        client: Client,
    ): Promise<void> {
        if (
            !interaction.member?.permissions.has(Permissions.FLAGS.KICK_MEMBERS)
        ) {
            return interaction.reply({
                content: Constants['Errors'].NO_PERMISSIONS,
                ephemeral: true,
            });
        }
        const guild = client.guilds.cache.get(interaction.guildId);
        const user = interaction.options.getUser('user');
        let reason = interaction.options.getString('reason');
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
            .setTitle('You have been kicked from the server.')
            .setThumbnail(interaction.user.avatarURL()!)
            .addFields(
                {
                    name: 'User',
                    value: `You were kicked by ${interaction.user.tag}`,
                    inline: true,
                },
                { name: 'Reason', value: `${reason}`, inline: true },
            )
            .setTimestamp();
        await user!.send({ embeds: [embed] });
        guild?.members.kick(user as UserResolvable);
        await interaction.reply({
            content: `${user!.tag} has been kicked.`,
            ephemeral: true,
        });
    },
};
