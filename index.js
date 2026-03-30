require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.prefixCommands = new Collection();
client.slashCommands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();

require("./handlers/commandHandler")(client);
require("./handlers/buttonHandler")(client);
require("./handlers/modalHandler")(client);
require("./handlers/eventHandler")(client);

client.login(process.env.DISCORD_TOKEN);