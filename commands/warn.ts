import { CommandInteraction, Permissions, MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Constants } from '../lib/constants';
import warnSchema from '../schemas/warn-schema';
export = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Add, remove or view the warnings of a user.')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('add')
                .setDescription('Add a warning to a user.')
                .addUserOption((option) =>
                    option
                        .setName('user')
                        .setDescription('The user to add a warning to.')
                        .setRequired(true),
                )
                .addStringOption((option) =>
                    option
                        .setName('reason')
                        .setDescription('The reason for the warning.')
                        .setRequired(true),
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('remove')
                .setDescription('Remove a warning from a user.')
                .addUserOption((option) =>
                    option
                        .setName('user')
                        .setDescription('The user to remove a warning from.')
                        .setRequired(true),
                )
                .addStringOption((option) =>
                    option
                        .setName('id')
                        .setDescription('The ID of the warning to remove.')
                        .setRequired(true),
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('list')
                .setDescription('List the warnings of a user.')
                .addUserOption((option) =>
                    option
                        .setName('user')
                        .setDescription('The user to list the warnings of.')
                        .setRequired(true),
                ),
        ),
    async execute(
        interaction: CommandInteraction<'cached'> /*client: Client*/,
    ): Promise<void> {
        const subCommand = interaction.options.getSubcommand();
        const user = interaction.options.getUser('user');
        if (
            !interaction.member?.permissions.has(
                Permissions.FLAGS.MODERATE_MEMBERS,
            )
        ) {
            return interaction.reply({
                content: Constants['Errors'].NO_PERMISSIONS,
                ephemeral: true,
            });
        }
        switch (subCommand) {
            case 'add':
                const reason = interaction.options.getString('reason');
                await warnSchema
                    .create({
                        userId: user!.id,
                        guildId: interaction.guild.id,
                        reason,
                        staffId: interaction.user.id,
                    })
                    .then((warning) => {
                        return interaction.reply({
                            content: `Added warning ${warning.id} to ${
                                user!.tag
                            }.`,
                            ephemeral: true,
                        });
                    });

                const warnEmbed = new MessageEmbed()
                    .setColor(Constants.Colors.DEFAULT)
                    .setTitle('You have been warned.')
                    .setThumbnail(interaction.user.avatarURL() as string)
                    .addFields(
                        {
                            name: 'User',
                            value: `You were warned by ${interaction.user.tag}`,
                        },
                        { name: 'Reason', value: `${reason}` },
                    );
                user!.send({ embeds: [warnEmbed] }).catch(console.error);
                break;
            case 'remove':
                const id = interaction.options.getString('id');
                await warnSchema.findByIdAndDelete(id).then((warning) => {
                    return interaction.reply({
                        content: `Removed warning ${warning.id} from ${
                            user!.tag
                        }.`,
                        ephemeral: true,
                    });
                });
                break;
            case 'list':
                const warningsList = await warnSchema.find({
                    userId: user!.id,
                    guildId: interaction.guild.id,
                });

                let description = `Warns:\n`;

                for (const warning of warningsList) {
                    description += `ID: ${warning.id}\nReason: ${warning.reason}\n`;
                    description += `Added by <@${warning.staffId}>\n`;
                    description += `Added at ${warning.createdAt.toLocaleString()}\n\n`;
                }

                const embed = new MessageEmbed()
                    .setColor(Constants.Colors.DEFAULT)
                    .setTitle(`Warnings for ${user!.tag}`)
                    .setDescription(description);

                await interaction.reply({ embeds: [embed] });
                break;
            default:
                interaction.reply({
                    content: 'Invalid subcommand.',
                    ephemeral: true,
                });
                break;
        }
    },
};
