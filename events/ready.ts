import { Client } from 'discord.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

console.log('Starting...');
console.log('Connecting to the database...');
export default (client: Client): void => {
    client.on('ready', async () => {
        await mongoose
            .connect(process.env.MONGO_URI as string, {
                keepAlive: true,
            })
            .then(() => console.log('Connected to MongoDB!'));
        if (!client.user || !client.application) {
            return console.error('Client user or application is undefined.');
        }
        client.user.setActivity('the Lewis server.', {
            type: 'WATCHING', //,
            //url: "https://www.twitch.tv/example-url" only needed if the status is 'STREAMING'
        });
        console.log(`${client.user.tag} is ready.`);
    });
};
