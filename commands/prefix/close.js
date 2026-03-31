module.exports = {
  name: "close",

  async execute(message) {
    if (message.author.bot) return;

    const STAFF_ROLE_IDS = ["1466269101260411013", "1466310900121337856"];

    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);

    if (!isAdmin && !hasRole) {
      return message.reply({
        content: "<:rose_xMark:1488048189255716945> You do **not** have **permission** to use this command.",
        allowedMentions: { repliedUser: false }
      });
    }

    if (!message.channel.topic || !/^\d+$/.test(message.channel.topic)) {
      return message.reply({
        content: "<:rose_xMark:1488048189255716945> This is not a valid **ticket** channel.",
        allowedMentions: { repliedUser: false }
      });
    }

    try {
      const user = await message.client.users.fetch(message.channel.topic).catch(() => null);

      if (user) {
        await user.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# Ticket Closed"
        },
        {
          "type": 10,
          "content": "Your ticket in **.rose** has been closed. If you need further assistance, do not hesitate to contact us again. We hope you enjoyed your experience with our team."
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

      await message.delete().catch(() => {});

      await message.channel.send({
  "flags": 32832,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "<a:rose_loading:1488093350933561354> Closing ticket..."
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
        await message.channel.delete().catch(() => {});
      }, 3000);

    } catch (err) {
      console.error(err);

      return message.reply({
        content: "<:rose_xMark:1488048189255716945> An **error** occurred while attempting to close this ticket.",
        allowedMentions: { repliedUser: false }
      });
    }
  }
};