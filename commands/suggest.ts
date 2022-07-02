import {
    Modal,
    MessageActionRow,
    TextInputComponent,
    MessageActionRowComponent,
    MessageActionRowComponentResolvable,
    CommandInteraction,
    MessageEmbed,
    Client,
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Constants } from '../lib/constants';

export = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Create a suggestion.')
        .addStringOption((option) =>
            option
                .setName('project')
                .setDescription('What project is your suggestion about?')
                .setRequired(true)
                .addChoices(
                    { name: 'Discord Bot', value: 'Discord Bot' },
                    { name: 'Server', value: 'Server' },
                ),
        ),
    async execute(
        interaction: CommandInteraction<'cached'>,
        client: Client,
    ): Promise<void> {
        const project = interaction.options.getString('project');
        const suggestChannel = Constants.Channels.SUGGESTIONS;
        if (!interaction.isCommand()) return;
        const modal = new Modal()
            .setCustomId('suggestionModal')
            .setTitle('Suggestion');
        const suggestionInput = new TextInputComponent()
            .setCustomId('suggestionInput')
            .setLabel('Your suggestion')
            .setStyle('PARAGRAPH')
            .setRequired(true)
            .setMinLength(1);
        const otherInput = new TextInputComponent()
            .setCustomId('otherInput')
            .setLabel('Any other information you want to share?')
            .setStyle('PARAGRAPH')
            .setMinLength(1)
            .setRequired(false);
        const firstActionRow =
            new MessageActionRow<MessageActionRowComponent>().addComponents(
                suggestionInput as MessageActionRowComponentResolvable,
            );
        const secondActionRow =
            new MessageActionRow<MessageActionRowComponent>().addComponents(
                otherInput as MessageActionRowComponentResolvable,
            );
        //@ts-ignore
        modal.addComponents(firstActionRow, secondActionRow);
        await interaction.showModal(modal);

        if (!interaction.isModalSubmit()) return;

        if (interaction.customId === 'suggestionModal') {
            await interaction.reply({
                content: 'Your submission was recieved successfully!',
            });
        }

        const suggestion =
            interaction.fields.getTextInputValue('suggestionInput');
        const other = interaction.fields.getTextInputValue('otherInput');

        console.log(other, suggestion);
        const embed = new MessageEmbed()
            .setColor(Constants.Colors.DEFAULT)
            .setAuthor({
                name: `Suggestion from ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setThumbnail(interaction.user.displayAvatarURL())
            .setDescription(`Project: ${project}`)
            .addFields(
                { name: 'Suggestion', value: suggestion },
                { name: 'Other', value: other },
            )
            .setTimestamp();
        const channel = client.channels.cache.get(suggestChannel);
        //@ts-ignore
        channel.send({ embeds: [embed] });
    },
};
