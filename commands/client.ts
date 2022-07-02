import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { Constants } from '../lib/constants';

export = {
    data: new SlashCommandBuilder()
        .setName('client')
        .setDescription('Base client information and commands.')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('info')
                .setDescription('Information about the client.'),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('emit')
                .setDescription('Emit an event.')
                .addStringOption((option) =>
                    option
                        .setName('event')
                        .setDescription('Select the event to emit.')
                        .setRequired(true),
                )
                .addStringOption((option) =>
                    option
                        .setName('data')
                        .setDescription('Select the data to emit.')
                        .setRequired(true),
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('eval')
                .setDescription('Evaluate a code snippet.')
                .addStringOption((option) =>
                    option
                        .setName('code')
                        .setDescription('Select the code to evaluate.')
                        .setRequired(true),
                ),
        ),
    async execute(interaction: CommandInteraction): Promise<void> {
        const command = interaction.options.getSubcommand();
        switch (command) {
            case 'info':
                const embed = new MessageEmbed()
                    .setAuthor('Client Information about the lewis bot.')
                    .setColor(Constants.Colors.DEFAULT)
                    .setThumbnail(interaction.client.user?.avatarURL() || '')
                    .addFields(
                        {
                            // @ts-ignore
                            name: 'Name',
                            value: interaction.client.user?.username,
                        },
                        { name: 'ID', value: interaction.client.user?.id },
                        {
                            name: 'Created At',
                            value: `<t:${interaction.client.user?.createdTimestamp.toString()}:F>`,
                        },
                        { name: 'Developer', value: 'Pix#0001' },
                        {
                            name: 'Version',
                            value: Constants.Client.VERSION as string,
                        },
                        {
                            name: 'Guilds',
                            value: interaction.client.guilds.cache.size.toString(),
                            inline: true,
                        },
                        {
                            name: 'Users',
                            value: interaction.client.users.cache.size.toString(),
                            inline: true,
                        },
                        {
                            name: 'Channels',
                            value: interaction.client.channels.cache.size.toString(),
                            inline: true,
                        },
                        {
                            name: 'Ping',
                            value: interaction.client.ws.ping.toString() + 'ms',
                        },
                    )
                    .setFooter('Powered by discord.js and node.js.');

                interaction.reply({
                    embeds: [embed],
                    ephemeral: true,
                });
                break;
            case 'emit':
                interaction.reply({
                    content: Constants.Errors.COMMAND_ON_DEVELOPMENT,
                    ephemeral: true,
                });
                break;
            case 'eval':
                if (interaction.user.id !== '714042749657022487') {
                    return interaction.reply({
                        content: Constants['Errors'].NO_PERMISSIONS,
                        ephemeral: true,
                    });
                }
                const code: string = interaction.options.getString('code')!;
                try {
                    const result: string = eval(code);
                    await interaction.reply({
                        content: `${result}`,
                        ephemeral: true,
                    });
                } catch (error) {
                    interaction.reply({
                        content: `${error}`,
                        ephemeral: true,
                    });
                }
                break;
            default:
                return interaction.reply({
                    content: 'Invalid arguments.',
                    ephemeral: true,
                });
        }
    },
};
