const { ActivityType } = require("discord.js");

async function updateBotStatus(client) {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (!guild) return;

  const count = guild.memberCount;

  client.user.setPresence({
    activities: [
      {
        name: `Watching ${count} members`,
        type: ActivityType.Watching
      }
    ],
    status: "online"
  });
}

module.exports = {
  name: "ready",
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}`);

    await updateBotStatus(client);
  }
};