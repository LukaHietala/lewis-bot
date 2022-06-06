import { Client } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

console.log('Starting...');
export default (client: Client): void => {
    client.on('ready', async () => {
        if (!client.user || !client.application) {
            return console.error('Client user or application is undefined.');
        }
        client.user.setActivity("the Lewis server.", {
            type: "WATCHING"//,
            //url: "https://www.twitch.tv/example-url" only needed if the status is 'STREAMING'
        });
        console.log(`${client.user.tag} is ready.`);
    });
};
