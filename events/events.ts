import { Client } from 'discord.js';
import ready from './ready';
import guildMemberAdd from './guildMemberAdd';
import interactionCreate from './interactionCreate';

export default (client: Client): void => {
    ready(client);
    guildMemberAdd(client);
    interactionCreate(client);
};
