# lewis-bot

## Prerequisites

Create an application in Discord's developer portal (https://discord.dev). You need to add all the Intents and permissions.

Then create a link in OAuth2 section and make sure that `bot` and `application.commands` are checked, otherwise the bot won't work correctly. (Make sure that the bot has the `ADMINISTRATOR` permission)

Thing that you need to know before contributing:

-   Typescript
-   Node.js
-   Discord JS

Not required, but good to know:

-   REST API
-   Mongoose

## Installation

The official bot for Lewis Menelaws (TectTok).
You need to know the basics of programming before contributing. Otherwise, you probably will have many issues with the bot.

To get started, you need to first install all the dependencies.

```bash
npm install
```

After that's done, you need to install Node.js, Typescript as a global module, and ts node for TypeScript.

```bash
npm install nodejs
npm install typescript
npm install ts-node
```

## Usage

First rename the file called `.env.template` to `.env`, that will hold all the base information for the bot. You should keep this information private at all times.
The file should look like this:

```env
# Ignore these symbols <>
TOKEN=<token>
CLIENT_ID=<client_id>
GUILD_ID=<guild_id>
```

And now run `ts-node index.ts` to deploy and run the bot via REST API.
