"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
const constants_1 = require("../lib/constants");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Lets you make a suggestion to the relevant dev!')
        .addStringOption((option) => option
        .setName('project')
        .setDescription('What project is your suggestion about?')
        .setRequired(true)
        .addChoices({ name: 'Discord Bot', value: 'Discord Bot' }, { name: 'Server', value: 'Server' }))
        .addStringOption((option) => option
        .setName('suggestion')
        .setDescription('What is your suggestion?')
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = interaction.user.id;
            const project = interaction.options.getString('project');
            const suggestion = interaction.options.getString('suggestion');
            const suggestChannel = constants_1.Constants.Channels.SUGGESTIONS;
            if (user.bot || user.id === interaction.user.id) {
                return interaction.reply({
                    content: constants_1.Constants['Errors'].NOT_VALID_USER,
                    ephemeral: true,
                });
            }
            const embed = new discord_js_1.MessageEmbed()
                .setColor(constants_1.Constants.Colors.DEFAULT)
                .setTitle('New Suggestion')
                .setThumbnail(interaction.user.avatarURL())
                .addFields({
                name: 'Project',
                value: `${project}`,
                inline: true,
            }, { name: 'Suggestion', value: `${suggestion}`, inline: true }, {
                name: 'Suggested by:',
                value: `${interaction.user}`,
                inline: false,
            })
                .setTimestamp();
            yield interaction.reply({
                content: 'Your suggestion has been sent!',
                ephemeral: true,
            });
            yield interaction.guild.channels.cache
                .get(suggestChannel)
                .send({ embeds: [embed] });
        });
    },
};
