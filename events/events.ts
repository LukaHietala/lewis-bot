import { Client } from 'discord.js';
import ready from './ready';
import guildMemberAdd from './guildMemberAdd';

export default (client: Client): void => {
    ready(client);
    guildMemberAdd(client);
};
