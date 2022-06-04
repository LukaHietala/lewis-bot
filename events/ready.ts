import { Client } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

console.log('Starting...');
export default (client: Client): void => {
    client.on('ready', async () => {
        if (!client.user || !client.application) {
            return console.error('Client user or application is undefined.');
        }
        console.log(`${client.user.tag} is ready.`);
    });
};
