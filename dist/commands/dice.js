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
const builders_1 = require("@discordjs/builders");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('dice')
        .setDescription('Plays a game of dice with you!')
        .addNumberOption((option) => option
        .setName('number')
        .setDescription('Number between 1 and 6.')
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let ranNum = Math.floor(Math.random() * 6) + 1;
            const number = interaction.options.getNumber('number');
            if (number == ranNum) {
                return interaction.reply(`Your number was ${number} and the random number was ${ranNum}. You win.`);
            }
            else {
                return interaction.reply(`Your number was ${number} and the random number was ${ranNum}. You lose.`);
            }
        });
    }
};
