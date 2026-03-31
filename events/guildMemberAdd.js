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
  name: "guildMemberAdd",
  async execute(client, member) {
    const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID;
    const AUTO_ROLE_ID = process.env.AUTO_ROLE_ID;

    try {
      if (AUTO_ROLE_ID) {
        const role = member.guild.roles.cache.get(AUTO_ROLE_ID);
        if (role) {
          await member.roles.add(role);
        }
      }

      if (WELCOME_CHANNEL_ID) {
        const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);

        if (channel) {
          await channel.send({
  "content": `Welcome ${member} to **.rose** - your go-to ER:LC service provider. We offer high-quality products for cheap.`,
  "components": [
    {
      "type": 1,
      "components": [
        {
          "style": 2,
          "type": 2,
          "label": `${member.guild.memberCount}`,
          "emoji": {
            "id": "1487233809614372945",
            "name": "rose_Person",
            "animated": false
          },
          "disabled": true,
          "flow": {
            "actions": []
          },
          "custom_id": "p_285644999431819302"
        },
        {
          "type": 2,
          "style": 5,
          "label": "Dashboard",
          "url": "https://discord.com/channels/1317959017888354467/1452801176851583048",
        }
      ]
    }
  ]
});
        }
      }

      await updateBotStatus(client, member.guild);
    } catch (error) {
      console.error(`guildMemberAdd error:`, error);
    }
  }
};