# Discord Bot for Cleaning Messages
This is a simple Discord bot that helps you clear messages from channels. You can use the following commands to remove messages:

`!:remove-all-messages` - Remove all messages in the channel.

`!:remove-all-bot-only` - Remove all messages sent by bots in the channel.

`!:remove-all-calling-bot` - Remove all messages that call the bot, by using a banned prefix list.

The bot has a delay of 10 seconds before deleting messages, which can be changed by modifying the delayTimeBeforeDelete variable.

## Getting Started
To use this bot, you will need to create a Discord bot and obtain its token. You can follow the steps in the [Discord.js](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) guide to create a bot and get its token.

Once you have the token, create a file named `.env` in the same directory as the index.js file, and add the following line to it:

```js
TOKEN=<your_bot_token>
```

Make sure to replace <your_bot_token> with your actual bot token.

Then, run the following commands to install the dependencies and start the bot:

```js
npm install
nodemon
```

The bot should now be online and ready to remove messages in your Discord server.