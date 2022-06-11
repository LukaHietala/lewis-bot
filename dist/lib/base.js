"use strict";
// Base values:
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseColors = exports.BaseErrors = exports.BaseChannels = exports.BaseEmojis = void 0;
var BaseEmojis;
(function (BaseEmojis) {
    BaseEmojis["LOADING"] = "<a:loading_green_bar:983752163903807538>";
    BaseEmojis["CONNECTION"] = "<:connection_excellent:983752023923109979>";
})(BaseEmojis = exports.BaseEmojis || (exports.BaseEmojis = {}));
var BaseChannels;
(function (BaseChannels) {
    BaseChannels["WELCOME"] = "905183354930995320";
    BaseChannels["SUGGESTIONS"] = "983448691224477796";
})(BaseChannels = exports.BaseChannels || (exports.BaseChannels = {}));
var BaseErrors;
(function (BaseErrors) {
    BaseErrors["NO_PERMISSIONS"] = "You do not have the required permission to use this command.";
    BaseErrors["NO_VALID_CHANNEL"] = "This is not a valid channel.";
    BaseErrors["COMMAND_ON_DEVELOPMENT"] = "This command is currently under development.";
    BaseErrors["USER_BOT"] = "You can only use this command on members.";
    BaseErrors["NOT_VALID_USER"] = "This is not a valid user.";
    BaseErrors["NOT_AVAILABLE"] = "This command is not available.";
})(BaseErrors = exports.BaseErrors || (exports.BaseErrors = {}));
var BaseColors;
(function (BaseColors) {
    BaseColors["DEFAULT"] = "#4d8feb";
})(BaseColors = exports.BaseColors || (exports.BaseColors = {}));
