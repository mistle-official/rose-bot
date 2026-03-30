module.exports = {
  customId: "p_285689439538122754",

  async execute(interaction) {

    const STAFF_ROLE_IDS = ["1488071288970023035", "1488033004562677930"]

    const isAdmin = interaction.member.permissions.has("Administrator");
    const hasRole = interaction.member.roles.cache.has(STAFF_ROLE_IDS);

    if (!isAdmin && !hasRole) {
      return interaction.reply({
        content: "<:rose_xMark:1488048189255716945> You do **not** have **permission** to use this button.",
        ephemeral: true
      });
    }

    // must be a ticket channel (topic = user id)
    if (!interaction.channel.topic || !/^\d+$/.test(interaction.channel.topic)) {
      return interaction.reply({
        content: "<:rose_xMark:1488048189255716945> This is not a valid **ticket** channel.",
        ephemeral: true
      });
    }

    try {

      await interaction.reply({
  "flags": 32768,
  ephemeral: true,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "<a:sea_loading:1466357864477098014> Closing ticket..."
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1488043526448218233/1488044260874780712/Screenshot_2026-03-29_221112.png?ex=69cb58b6&is=69ca0736&hm=8fc5e7f9fb255acf0b6e195484f7bf8d33021eb9cbf0176eda72aa47c588a448&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
});

      setTimeout(async () => {
        await interaction.channel.delete().catch(() => {});
      }, 3000);

    } catch (err) {
      console.error(err);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "<:rose_xMark:1488048189255716945> An **error** occurred.",
          ephemeral: true
        }).catch(() => {});
      } else {
        await interaction.reply({
          content: "<:rose_xMark:1488048189255716945> An **error** occurred.",
          ephemeral: true
        }).catch(() => {});
      }
    }
  }
};