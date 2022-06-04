import {
    BaseEmojis,
    BaseChannels,
    BaseErrors,
    BaseColors,
    BaseGuilds,
} from './base';

const Emojis: typeof BaseEmojis = BaseEmojis;
const Channels: typeof BaseChannels = BaseChannels;
const Errors: typeof BaseErrors = BaseErrors;
const Colors: typeof BaseColors = BaseColors;
const Guilds: typeof BaseGuilds = BaseGuilds;
export class Constants {
    static Emojis: typeof BaseEmojis = Emojis;
    static Channels: typeof BaseChannels = Channels;
    static Errors: typeof BaseErrors = Errors;
    static Colors: typeof BaseColors = Colors;
    static Guilds: typeof BaseGuilds = Guilds;
}
