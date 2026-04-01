module.exports = {
  customId: "p_286363480833921025",

  async execute(interaction) {
    const STAFF_ROLE_IDS = ["1466269101260411013", "1477768302058143935"];

    const isAdmin = interaction.member.permissions.has("Administrator");
    const hasRole = interaction.member.roles.cache.has(STAFF_ROLE_IDS);

    if (!isAdmin && !hasRole) {
      return interaction.reply({
        content: "<:rose_xMark:1486977010143199382> You do **not** have **permission** to use this button.",
        flags: 64
      });
    }


    try {
      const user = await interaction.client.users.fetch(interaction.channel.topic).catch(() => null);

      if (user) {
        await user.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# Order Closed"
        },
        {
          "type": 10,
          "content": "Thank yoou for ordering at **.rose**. Your order ticket has been closed. If you feel this action is wrong, or you are unsure why your order was closed, feel free to open a ticekt."
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
                "url": "https://media.discordapp.net/attachments/1488365406069588159/1488367090221187212/Screenshot_2026-03-29_221112.png?ex=69cc855e&is=69cb33de&hm=7eb082739c4c3e78358696eea976e72ed23183c122a3161735ed6ee77bac973f&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
}).catch(() => {});
      }

      await interaction.reply({
  "flags": 32832,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "<a:rose_loading:1466357864477098014> Closing ticket..."
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
                "url": "https://media.discordapp.net/attachments/1488365406069588159/1488367090221187212/Screenshot_2026-03-29_221112.png?ex=69cc855e&is=69cb33de&hm=7eb082739c4c3e78358696eea976e72ed23183c122a3161735ed6ee77bac973f&=&format=webp&quality=lossless"
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
          content: "<:rose_xMark:1486977010143199382> An **error** occured.",
          flags: 64
        }).catch(() => {});
      } else {
        await interaction.reply({
          content: "<:rose_xMark:1486977010143199382> An **error** occured.",
          flags: 64
        }).catch(() => {});
      }
    }
  }
};