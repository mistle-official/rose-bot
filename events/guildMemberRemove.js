const { ActivityType } = require("discord.js");

async function updateBotStatus(client, guild) {
  client.user.setPresence({
    activities: [
      {
        name: `Watching ${guild.memberCount} members`,
        type: ActivityType.Watching
      }
    ],
    status: "online"
  });
}

module.exports = {
  name: "guildMemberRemove",
  async execute(client, member) {
    try {
      await updateBotStatus(client, member.guild);
    } catch (error) {
      console.error(`guildMemberRemove error:`, error);
    }
  }
};