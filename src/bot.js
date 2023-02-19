import { commands } from './commands.js';
import { config } from 'dotenv';
import Discord from 'discord.js';

config();


const client = new Discord.Client({
  intents: [
    Discord.IntentsBitField.Flags.GuildMessages,
    Discord.IntentsBitField.Flags.Guilds,
    Discord.IntentsBitField.Flags.GuildMembers,
    Discord.IntentsBitField.Flags.MessageContent
  ]
});

const delayTimeBeforeDelete = 10000; // 10 seconds
const commandsToDelete = commands.prefixBlockList;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


// TESTE
client.on('messageCreate', (message) => {
  if (message.content === "teste") {
    if (!checkPermission(message)) {
      return;
    }
    message.reply('Não tira meu tempo rapá')
  }
})


// CLEAR ALL MESSAGES
client.on('messageCreate', (message) => {
  if (!checkPermission(message)) {
    return;
  }
  if (message.content === commands.clearAllMessages) {
  channelId = message.channelId;
    let channel = client.channels.cache.get(channelId);

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
  if (!checkPermission(message)) {
    return;
  }
  if (message.content === commands.clearAllBotMessages) {
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
  if (!checkPermission(message)) {
    return;
  }
  if (message.content === commands.clearAllMessagesWithPrefix) {
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
  let firstString = splitedMessage[0].toLowerCase();

  if (commandsToDelete.includes(firstString)) {
    setTimeout(() => {
      message.delete();
    }, delayTimeBeforeDelete);
  }
}

function checkPermission(message) {
    return message.member.roles.cache.some(role => role.name === 'Admin')
}

client.login(process.env.TOKEN);