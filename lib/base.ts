// Base values:

export enum BaseEmojis {
    LOADING = '<a:loading_green_bar:983752163903807538>',
    CONNECTION = '<:connection_excellent:983752023923109979>'
}

export enum BaseChannels {
    WELCOME = '905183354930995320', //Channel ID of the welcome channel.
    SUGGESTIONS = '983448691224477796', //Channel ID of the suggestion channel (output of suggest command)
}

export enum BaseErrors {
    NO_PERMISSIONS = 'You do not have the required permission to use this command.',
    NO_VALID_CHANNEL = 'This is not a valid channel.',
    COMMAND_ON_DEVELOPMENT = 'This command is currently under development.',
    USER_BOT = 'You can only use this command on members.',
    NOT_VALID_USER = 'This is not a valid user.',
    NOT_AVAILABLE = 'This command is not available.',
}

export enum BaseColors {
    DEFAULT = '#4d8feb', //HEX of the embed color
}