import { SlashCommandBuilder } from '@discordjs/builders';
export = {
    data: new SlashCommandBuilder()
        .setName('dice')
        .setDescription('Plays a game of dice with you!')
        .addNumberOption((option) =>
            option
                .setName('number')
                .setDescription('Number between 1 and 6.')
                .setRequired(true),
        ),
    async execute(interaction: any) {
		let ranNum = Math.floor(Math.random() * 6) + 1;
        const number = interaction.options.getNumber('number');

		if (number == ranNum) {
            return interaction.reply(`Your number was ${number} and the random number was ${ranNum}. You win.`); 
        }
        else {
            return interaction.reply(`Your number was ${number} and the random number was ${ranNum}. You lose.`);
        }
	}
};