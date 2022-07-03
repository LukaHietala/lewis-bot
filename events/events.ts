import { Client } from 'discord.js';
import ready from './ready';

export default (client: Client): void => {
    ready(client);
};
