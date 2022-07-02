import {
    BaseEmojis,
    BaseChannels,
    BaseErrors,
    BaseColors,
    BaseClient,
} from './base';

const Emojis: typeof BaseEmojis = BaseEmojis;
const Channels: typeof BaseChannels = BaseChannels;
const Errors: typeof BaseErrors = BaseErrors;
const Colors: typeof BaseColors = BaseColors;
const Client: typeof BaseClient = BaseClient;
export class Constants {
    static Emojis: typeof BaseEmojis = Emojis;
    static Channels: typeof BaseChannels = Channels;
    static Errors: typeof BaseErrors = Errors;
    static Colors: typeof BaseColors = Colors;
    static Client: typeof BaseClient = Client;
}
