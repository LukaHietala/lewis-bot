import { Client, MessageSelectMenu, MessageActionRow } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Constants } from '../lib/constants';

export = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Sets your roles.'),

    async execute(interaction: any, client: Client) {
        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('No roles selected. Select one!')
					.addOptions([
						{
							label: '⌨️ Programmer',
							value: 'Programmer',
						},
						{
							label: '👩‍💻 Information Technology',
							value: 'Information Technology',
						},
                        {
							label: '📹 Content Creator',
							value: 'Content Creator',
						},
                        {
							label: '🎨 Designer',
							value: 'Designer',
						},
					]),
			);
            await interaction.reply({ components: [row] });
    },
};

