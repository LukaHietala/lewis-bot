import { SlashCommandBuilder } from '@discordjs/builders';
import {
    Client,
    CommandInteraction,
    MessageEmbed,
    Permissions,
    UserResolvable,
} from 'discord.js';

import { Constants } from '../lib/constants';
export = {
    data: new SlashCommandBuilder()
        .setName('softban')
        .setDescription('Softbans a chosen user.')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('Select the user to ban.')
                .setRequired(true),
        ),

    async execute(
        interaction: CommandInteraction<'cached'>,
        client: Client,
    ): Promise<void> {
        if (
            !interaction.member?.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
        ) {
            return interaction.reply({
                content: Constants['Errors'].NO_PERMISSIONS,
                ephemeral: true,
            });
        }
        const guild = client.guilds.cache.get(interaction.guildId);
        const user = interaction.options.getUser('user');

        if (user!.bot || user!.id === interaction.user.id) {
            return interaction.reply({
                content: Constants['Errors'].NOT_VALID_USER,
                ephemeral: true,
            });
        }

        const embed = new MessageEmbed()
            .setColor(Constants.Colors.DEFAULT)
            .setTitle('You have been softbanned from the server.')
            .setThumbnail(interaction.user.avatarURL()!)
            .setDescription('You can join the server again.')
            .addFields({
                name: 'User',
                value: `You were softbanned by ${interaction.user.tag}`,
                inline: true,
            })
            .setTimestamp();
        await user!.send({ embeds: [embed] });
        guild?.members.ban(user as UserResolvable);
        await interaction.reply({
            content: `${user!.tag} has been softbanned.`,
            ephemeral: true,
        });

        await guild?.members.unban(user!.id);
    },
};
