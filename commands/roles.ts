import {
    MessageSelectMenu,
    MessageActionRow,
    CommandInteraction,
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
export = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Sets your roles.')
        .addSubcommand((subcommand) =>
            subcommand.setName('menu').setDescription('Shows the role menu.'),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('info')
                .setDescription('Information about the server roles.'),
        ),
    async execute(interaction: CommandInteraction<'cached'>): Promise<void> {
        const command = interaction.options.getSubcommand();
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('language')
                .setPlaceholder('Select a programming language.')
                .setMinValues(1)
                .setMaxValues(9)
                .addOptions([
                    {
                        label: 'JavaScript',
                        value: 'javascript',
                    },
                    {
                        label: 'TypeScript',
                        value: 'typescript',
                    },
                    {
                        label: 'Python',
                        value: 'python',
                    },
                    {
                        label: 'C++',
                        value: 'c++',
                    },
                    {
                        label: 'C#',
                        value: 'c#',
                    },
                    {
                        label: 'C',
                        value: 'c',
                    },
                    {
                        label: 'Go',
                        value: 'go',
                    },
                    {
                        label: 'Rust',
                        value: 'rust',
                    },
                    {
                        label: 'Java',
                        value: 'java',
                    },
                ]),
        );

        const rowOther = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('other')
                .setPlaceholder('Other roles.')
                .setMinValues(1)
                .setMaxValues(3)
                .addOptions([
                    {
                        label: 'Programmer',
                        value: 'programmer',
                    },
                    {
                        label: 'Designer',
                        value: 'designer',
                    },
                    {
                        label: 'Content Creator',
                        value: 'content creator',
                    },
                ]),
        );
        if (command === 'menu') {
            await interaction.reply({
                components: [row, rowOther],
                ephemeral: true,
            });
        }

        if (command === 'info') {
            await interaction.reply({
                content:
                    'This is a list of roles that can be assigned to a user. NOT COMPLETE.',
                ephemeral: true,
            });
        }

        if (!interaction.isSelectMenu()) return;
        if (interaction.customId === 'language') {
            const wait = require('node:timers/promises').setTimeout;
            await interaction.deferUpdate();
            await wait(500);
            await interaction.editReply({
                content: `The role ${interaction.values} was selected.`,
                components: [],
            });
        }
        if (interaction.customId === 'other') {
            const wait = require('node:timers/promises').setTimeout;
            await interaction.deferUpdate();
            await wait(500);
            await interaction.editReply({
                content: `The role ${interaction.values} was selected.`,
                components: [],
            });
        }
    },
};
