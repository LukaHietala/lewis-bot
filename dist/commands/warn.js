"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
const constants_1 = require("../lib/constants");
const warn_schema_1 = __importDefault(require("../schemas/warn-schema"));
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('warn')
        .setDescription('Add, remove or view the warnings of a user.')
        .addSubcommand((subcommand) => subcommand
        .setName('add')
        .setDescription('Add a warning to a user.')
        .addUserOption((option) => option
        .setName('user')
        .setDescription('The user to add a warning to.')
        .setRequired(true))
        .addStringOption((option) => option
        .setName('reason')
        .setDescription('The reason for the warning.')
        .setRequired(true)))
        .addSubcommand((subcommand) => subcommand
        .setName('remove')
        .setDescription('Remove a warning from a user.')
        .addUserOption((option) => option
        .setName('user')
        .setDescription('The user to remove a warning from.')
        .setRequired(true))
        .addStringOption((option) => option
        .setName('id')
        .setDescription('The ID of the warning to remove.')
        .setRequired(true)))
        .addSubcommand((subcommand) => subcommand
        .setName('list')
        .setDescription('List the warnings of a user.')
        .addUserOption((option) => option
        .setName('user')
        .setDescription('The user to list the warnings of.')
        .setRequired(true))),
    async execute(interaction /*client: Client*/) {
        const subCommand = interaction.options.getSubcommand();
        const user = interaction.options.getUser('user');
        if (!interaction.member?.permissions.has(discord_js_1.Permissions.FLAGS.MODERATE_MEMBERS)) {
            return interaction.reply({
                content: constants_1.Constants['Errors'].NO_PERMISSIONS,
                ephemeral: true,
            });
        }
        switch (subCommand) {
            case 'add':
                const reason = interaction.options.getString('reason');
                await warn_schema_1.default
                    .create({
                    userId: user.id,
                    guildId: interaction.guild.id,
                    reason,
                    staffId: interaction.user.id,
                })
                    .then((warning) => {
                    return interaction.reply({
                        content: `Added warning ${warning.id} to ${user.tag}.`,
                        ephemeral: true,
                    });
                });
                const warnEmbed = new discord_js_1.MessageEmbed()
                    .setColor(constants_1.Constants.Colors.DEFAULT)
                    .setTitle('You have been warned.')
                    .setThumbnail(interaction.user.avatarURL())
                    .addFields({
                    name: 'User',
                    value: `You were warned by ${interaction.user.tag}`,
                }, { name: 'Reason', value: `${reason}` });
                user.send({ embeds: [warnEmbed] }).catch(console.error);
                break;
            case 'remove':
                const id = interaction.options.getString('id');
                await warn_schema_1.default.findByIdAndDelete(id).then((warning) => {
                    return interaction.reply({
                        content: `Removed warning ${warning.id} from ${user.tag}.`,
                        ephemeral: true,
                    });
                });
                break;
            case 'list':
                const warningsList = await warn_schema_1.default.find({
                    userId: user.id,
                    guildId: interaction.guild.id,
                });
                let description = `Warns:`;
                for (const warning of warningsList) {
                    description += `ID: ${warning.id}\nReason: ${warning.reason}\n`;
                    description += `Added by <@${warning.staffId}>\n`;
                    description += `Added at ${warning.createdAt.toLocaleString()}\n\n`;
                }
                const embed = new discord_js_1.MessageEmbed()
                    .setColor(constants_1.Constants.Colors.DEFAULT)
                    .setTitle(`Warnings for ${user.tag}`)
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
