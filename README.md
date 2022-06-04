# lewis-bot

## Installation

The official bot for Lewis Menelaws (TectTok).
You need to know the basics of programming before contributing. Otherwise, you probably will have many issues with the bot.

To get started, you need to first install all the dependencies.

```bash
npm install
```

After that's done, you need to install Node.js, Typescript as a global module, and ts node for TypeScript.

## Usage

First go ahead and create file called `.env`, that will hold all the base information for the bot.
The file should look like this:

```env
# Ignore these symbols <>
TOKEN=<token>
CLIENT_ID=<client_id>
GUILD_ID=<guild_id>
```

And now run `ts-node deploy-commands.ts` to deploy the application commands via REST API.
After that you can run the bot with `ts-node index.ts`
