require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client({
  intents: [
    Discord.IntentsBitField.Flags.GuildMessages,
    Discord.IntentsBitField.Flags.Guilds,
    Discord.IntentsBitField.Flags.GuildMembers,
    Discord.IntentsBitField.Flags.MessageContent
  ]
});

const delayTimeBeforeDelete = 10000; // 10 seconds
const commandsToDelete = ['+play', '+join', '+skip'];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


// TESTE
client.on('messageCreate', (message) => {
  if (message.content === "teste") {
    console.log(message.channelId);
    message.reply('Não tira meu tempo rapá')
  }
})


// CLEAR ALL MESSAGES
client.on('messageCreate', (message) => {
  if (message.content === "!:remove-all-messages") {
    channelId = message.channelId;
    const channel = client.channels.cache.get(channelId);

    channel.messages.fetch().then(messages => {
      messages.forEach(message => {
        message.delete()
          .then(
            msg => console.log(`Deleted message from ${msg.author.username}`)
          )
          .catch(console.error);
      });
    }).catch(console.error);
  }
})


// CLEAR ALL BOT MESSAGES
client.on('messageCreate', (message) => {
  if (message.content === "!:remove-all-bot-only") {
    channelId = message.channelId;
    const channel = client.channels.cache.get(channelId);

    channel.messages.fetch().then(messages => {
      messages.forEach(message => {
        removeBotMessage(message)
      });
    }).catch(console.error);
  }
})


// CLEAR ALL MESSAGES WITH BANNED PREFIX
client.on('messageCreate', (message) => {
  if (message.content === "!:remove-all-calling-bot") {
    channelId = message.channelId;
    const channel = client.channels.cache.get(channelId);

    channel.messages.fetch().then(messages => {
      messages.forEach(message => {
        removeMessageWithBannedPrefix(message)
      });
    }).catch(console.error);
  }
})


// CLEAR CALLING BOT ACTION MESSAGES
client.on('messageCreate', (message) => {
  removeMessageWithBannedPrefix(message);
})


// CLEAR BOT MESSAGES
client.on('messageCreate', (message) => {
  removeBotMessage(message);
})


// GENERIC FUNCTION TO REMOVE MESSAGES SENDED BY A BOT
function removeBotMessage(message) {
  if (message.author.bot) {
    setTimeout(() => {
      message.delete();
    }, delayTimeBeforeDelete);
  }
}


// GENERIC FUNCTION TO REMOVE MESSAGES WITH PREFIX ON BLOCK LIST
function removeMessageWithBannedPrefix(message) {
  let splitedMessage = message.content.split(' ');
  firstString = splitedMessage[0].toLowerCase();

  if (commandsToDelete.includes(firstString)) {
    setTimeout(() => {
      message.delete();
    }, delayTimeBeforeDelete);
  }
}

client.login(process.env.TOKEN);