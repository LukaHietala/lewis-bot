import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Permissions, TextChannel } from 'discord.js';
import { Constants } from '../lib/constants';

export = {
    data: new SlashCommandBuilder()
        .setName('channel')
        .setDescription('Lock or unlock a channel.')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('lock')
                .setDescription('Lock a channel.')
                .addChannelOption((option) =>
                    option
                        .setName('channel')
                        .setDescription('Channel to lock.')
                        .setRequired(true),
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('unlock')
                .setDescription('Unlock a channel.')
                .addChannelOption((option) =>
                    option
                        .setName('channel')
                        .setDescription('Channel to unlock.')
                        .setRequired(true),
                ),
        ),

    async execute(interaction: CommandInteraction<'cached'>): Promise<void> {
        if (
            !interaction.member?.permissions.has(
                Permissions.FLAGS.MANAGE_CHANNELS,
            )
        ) {
            return interaction.reply({
                content: Constants['Errors'].NO_PERMISSIONS,
                ephemeral: true,
            });
        }
        const command = interaction.options.getSubcommand();
        const channel = interaction.options.getChannel(
            'channel',
        ) as TextChannel;
        switch (command) {
            case 'lock':
                if (!channel?.isText()) {
                    return interaction.reply({
                        content: 'Only text channels can be locked.',
                        ephemeral: true,
                    });
                }
                channel.permissionOverwrites
                    .edit(interaction.guild.roles.everyone.id, {
                        SEND_MESSAGES: false,
                    })
                    .then(() => {
                        interaction.reply({
                            content: 'Channel locked.',
                            ephemeral: true,
                        });
                    });
                break;
            case 'unlock':
                if (!channel?.isText()) {
                    return interaction.reply({
                        content: 'Only text channels can be unlocked.',
                        ephemeral: true,
                    });
                }
                channel.permissionOverwrites
                    .edit(interaction.guild.roles.everyone.id, {
                        SEND_MESSAGES: true,
                    })
                    .then(() => {
                        interaction.reply({
                            content: 'Channel unlocked.',
                            ephemeral: true,
                        });
                    });
                break;
            default:
                return interaction.reply({
                    content: 'Invalid arguments.',
                    ephemeral: true,
                });
        }
    },
};
