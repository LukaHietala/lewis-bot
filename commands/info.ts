import { SlashCommandBuilder } from '@discordjs/builders';
import {
    CommandInteraction,
    MessageActionRow,
    MessageButton,
    UserResolvable,
} from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { Constants } from '../lib/constants';

export = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Information commands.')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('user')
                .setDescription('Information about a chosen user.')
                .addUserOption((option) =>
                    option
                        .setName('user')
                        .setDescription(
                            'Select the user to get information about.',
                        )
                        .setRequired(true),
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('server')
                .setDescription('Information about the server.'),
        ),
    async execute(interaction: CommandInteraction): Promise<void> {
        const command = interaction.options.getSubcommand();
        switch (command) {
            case 'user':
                const user = interaction.options.getUser('user');
                const member = await interaction.guild!.members.fetch(
                    user as UserResolvable,
                );
                let avatarUrl: string = `${user!.avatarURL({ format: 'png' })}`;
                if (null || 'null') {
                    avatarUrl = `https://images-ext-2.discordapp.net/external/GyQicPLz_zQO15bOMtiGTtC4Kud7JjQbs1Ecuz7RrtU/https/cdn.discordapp.com/embed/avatars/1.png`;
                }
                const row = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setLabel('Avatar (png)')
                        .setURL(avatarUrl)
                        .setStyle('LINK'),
                );

                const roles = member.roles.cache
                    .filter((roles) => roles.id !== interaction.guild!.id)
                    .map((role) => role.toString());

                const uselessWords = [
                    'Connect, ',
                    'Create Instant Invite, ',
                    'Add Reactions, ',
                    'View Audit Log, ',
                    'Priority Speaker, ',
                    'Stream, ',
                    'View Channel, ',
                    'Send TTS Messages, ',
                    'Embed Links, ',
                    'Attach Files, ',
                    'Read Message History, ',
                    'Use External Emojis, ',
                    'Use Voice Activity, ',
                    'Mute Members, ',
                    'Deafen Members, ',
                    'Move Members, ',
                    'Change Nickname, ',
                    'Use Vad, ',
                    'Use Application Commands, ',
                    'Request To Speak, ',
                    'Speak, ',
                    'Use Public Threads, ',
                    'Create Public Threads, ',
                    'Use Private Threads, ',
                    'Create Private Threads, ',
                    'Use External Stickers, ',
                    'Send Messages In Threads, ',
                    'Start Embedded Activities, ',
                    'Start Embedded Activities',
                ];

                var expStr = uselessWords.join('\\b|\\b');
                const embed = new MessageEmbed()
                    .setColor(Constants.Colors.DEFAULT)
                    .setAuthor({
                        name: `Information about ${user?.tag}`,
                        iconURL: user?.displayAvatarURL(),
                    })
                    .setThumbnail(user!.displayAvatarURL())
                    .addFields(
                        {
                            // @ts-ignore
                            name: 'Joined',
                            value: `<t:${member.joinedTimestamp}:F>`,
                            inline: true,
                        },
                        {
                            name: 'User Created At',
                            value: `<t:${user!.createdTimestamp}:F>`,
                            inline: true,
                        },
                        {
                            name: `Roles (${member?.roles.cache.size - 1})`,
                            value: roles.toString() || 'None.',
                            inline: false,
                        },
                        {
                            name: "Member's key permissions",
                            value:
                                member?.permissions
                                    .toArray()
                                    .join(', ')
                                    .toString()
                                    .toLowerCase()
                                    .replaceAll('_', ' ')
                                    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                                        letter.toUpperCase(),
                                    )
                                    .trim()
                                    .replace(new RegExp(expStr, 'gi'), '')
                                    .replace(/ +/g, ' ') || 'None.',
                            inline: false,
                        },
                        {
                            name: 'Acknowledgements',
                            value: `None.`,
                            inline: false,
                        },
                        {
                            name: 'Server nickname',
                            value: member?.nickname || 'None.',
                            inline: false,
                        },
                    )
                    .setFooter(`User ID: ${user?.id}`);
                if (member?.user?.bot) {
                    embed.setDescription(
                        'This user is a Discord application. (Discord bot)',
                    );
                }
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true,
                    components: [row],
                });
                break;
            case 'server':
                const server = interaction.guild;
                const embed2 = new MessageEmbed()
                    .setColor(Constants.Colors.DEFAULT)
                    .setThumbnail(server!.iconURL()!)
                    .setAuthor({
                        name: `Information about ${server!.name}`,
                        iconURL: server!.iconURL()!,
                    })
                    .setDescription(
                        `Server ID: ${server!.id}\nServer's Owner: <@${
                            server!.ownerId
                        }>\nModerators / Admins: Coming soon!`,
                    )
                    .addFields(
                        {
                            // @ts-ignore //Same issues as before...
                            name: 'Server Created At',
                            value: `<t:${server!.createdTimestamp}:F>`,
                            inline: false,
                        },
                        {
                            name: `Server Roles (${server?.roles.cache.size})`,
                            value:
                                server?.roles.cache
                                    .map((role) => role.toString())
                                    .toString() || 'None.',
                            inline: false,
                        },
                        {
                            name: 'Member Count',
                            value: server!.memberCount.toString(),
                            inline: false,
                        },
                    );

                interaction.reply({ embeds: [embed2], ephemeral: true });
                break;
            default:
                interaction.reply({
                    content: 'Not a valid command',
                    ephemeral: true,
                });
        }
    },
};
