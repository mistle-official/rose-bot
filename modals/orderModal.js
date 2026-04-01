const {
  ChannelType,
  PermissionFlagsBits
} = require("discord.js");

const ORDER_TYPES = {
  ZgLFV3EjJn: {
    categoryId: "1488771298434879579",
    staffRoleIds: ["1478505490060279809", "1466269101260411013"],
    pingRoleId: "1478505490060279809"
  },
  XkhrSpToFM: {
    categoryId: "1488771403367976961",
    staffRoleIds: ["1478500833434931262", "1466269101260411013"],
    pingRoleId: "1478500833434931262"
  },
  Q9WQ7lUW8w: {
    categoryId: "1488771437358481509",
    staffRoleIds: ["1478500907829166231", "1466269101260411013"],
    pingRoleId: "1478500907829166231"
  },
  ReTPQ65q1n: {
    categoryId: "1488771658821926972",
    staffRoleIds: ["1478500932064116980", "1466269101260411013"],
    pingRoleId: "1478500932064116980"
  },
  dc65ZALgXP: {
    categoryId: "1488771696495169596",
    staffRoleIds: ["1478500977840492575", "1466269101260411013"],
    pingRoleId: "1478500977840492575"
  }
};

module.exports = {
  async execute(interaction) {
    if (!interaction.customId.startsWith("order_modal_")) return;

    const selected = interaction.customId.replace("order_modal_", "");
    const orderConfig = ORDER_TYPES[selected];

    if (!orderConfig) {
      return interaction.reply({
        content: "<:rose_xMark:1486977010143199382> Invalid order type selected.",
        ephemeral: true
      });
    }

    const budget = interaction.fields.getTextInputValue("budget");
    const description = interaction.fields.getTextInputValue("description");

    const existingChannel = interaction.guild.channels.cache.find(
      c =>
        c.parentId === orderConfig.categoryId &&
        c.topic === `order-${selected}-${interaction.user.id}`
    );

    if (existingChannel) {
      return interaction.reply({
        content: `<:rose_xMark:1486977010143199382> You already have an open order ticket: ${existingChannel}`,
        ephemeral: true
      });
    }

    const username = interaction.user.username
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 20);

    const permissionOverwrites = [
      {
        id: interaction.guild.roles.everyone.id,
        deny: [PermissionFlagsBits.ViewChannel]
      },
      {
        id: interaction.user.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.AttachFiles
        ]
      }
    ];

    for (const roleId of orderConfig.staffRoleIds) {
      permissionOverwrites.push({
        id: roleId,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.AttachFiles
        ]
      });
    }

    const channel = await interaction.guild.channels.create({
      name: `order-${username}`,
      type: ChannelType.GuildText,
      parent: orderConfig.categoryId,
      topic: `order-${selected}-${interaction.user.id}`,
      permissionOverwrites
    });

    await channel.send({
      "flags": 32768,
      "components": [
        {
          "type": 17,
          "components": [
            {
              "type": 12,
              "items": [
                {
                  "media": {
                    "url": "https://media.discordapp.net/attachments/1488365406069588159/1488765395258052698/image.png?ex=69cdf852&is=69cca6d2&hm=5cf3a56c205a36c6e1b0977a0a1488db9728ff15b10818ac75d41b0dd0644d35&=&format=webp&quality=lossless&width=1872&height=638"
                  }
                }
              ]
            },
            {
              "type": 10,
              "content": `<@&${orderConfig.pingRoleId}> | ${interaction.user}`
            },
            {
              "type": 14,
              "spacing": 2
            },
            {
              "type": 10,
              "content": `An order has been opened by ${interaction.user}. Ensure to review the following information provided by the customer below. In order for us to proceed with your order, you must **attach** a **reference**.`
            },
            {
              "type": 10,
              "content": `**Order Details**\n- Budget: ${budget}\n- Description: ${description}`
            },
            {
              "type": 1,
              "components": [
                {
                  "style": 2,
                  "type": 2,
                  "label": "Claim",
                  "flow": {
                    "actions": []
                  },
                  "custom_id": "p_286363526753161218"
                },
                {
                  "style": 4,
                  "type": 2,
                  "label": "Close",
                  "flow": {
                    "actions": []
                  },
                  "custom_id": "p_286363480833921025"
                }
              ]
            }
          ]
        }
      ]
    });

    if (selected === "ZgLFV3EjJn") {
      return interaction.reply({
        "flags": 32768,
        "components": [
          {
            "type": 17,
            "components": [
              {
                "type": 10,
                "content": `<:rose_Check:1486976983555379330> Successfully opened order ticket: ${channel}`
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
                      "url": "https://media.discordapp.net/attachments/1488365406069588159/1488367090221187212/Screenshot_2026-03-29_221112.png?ex=69cdd6de&is=69cc855e&hm=0e5536fef09bee026fb8f92625e5b310c1ff4a6bf214270db9d96f6d2a218923&=&format=webp&quality=lossless"
                    }
                  }
                ]
              }
            ]
          }
        ]
      });
    }

    if (selected === "XkhrSpToFM") {
      return interaction.reply({
        "flags": 32768,
        "components": [
          {
            "type": 17,
            "components": [
              {
                "type": 10,
                "content": `<:rose_Check:1486976983555379330> Successfully opened order ticket: ${channel}`
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
                      "url": "https://media.discordapp.net/attachments/1488365406069588159/1488367090221187212/Screenshot_2026-03-29_221112.png?ex=69cdd6de&is=69cc855e&hm=0e5536fef09bee026fb8f92625e5b310c1ff4a6bf214270db9d96f6d2a218923&=&format=webp&quality=lossless"
                    }
                  }
                ]
              }
            ]
          }
        ]
      });
    }

    if (selected === "Q9WQ7lUW8w") {
      return interaction.reply({
        "flags": 32768,
        "components": [
          {
            "type": 17,
            "components": [
              {
                "type": 10,
                "content": `<:rose_Check:1486976983555379330> Successfully opened order ticket: ${channel}`
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
                      "url": "https://media.discordapp.net/attachments/1488365406069588159/1488367090221187212/Screenshot_2026-03-29_221112.png?ex=69cdd6de&is=69cc855e&hm=0e5536fef09bee026fb8f92625e5b310c1ff4a6bf214270db9d96f6d2a218923&=&format=webp&quality=lossless"
                    }
                  }
                ]
              }
            ]
          }
        ]
      });
    }

    if (selected === "ReTPQ65q1n") {
      return interaction.reply({
        "flags": 32768,
        "components": [
          {
            "type": 17,
            "components": [
              {
                "type": 10,
                "content": `<:rose_Check:1486976983555379330> Successfully opened order ticket: ${channel}`
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
                      "url": "https://media.discordapp.net/attachments/1488365406069588159/1488367090221187212/Screenshot_2026-03-29_221112.png?ex=69cdd6de&is=69cc855e&hm=0e5536fef09bee026fb8f92625e5b310c1ff4a6bf214270db9d96f6d2a218923&=&format=webp&quality=lossless"
                    }
                  }
                ]
              }
            ]
          }
        ]
      });
    }

    if (selected === "dc65ZALgXP") {
      return interaction.reply({
        "flags": 32768,
        "components": [
          {
            "type": 17,
            "components": [
              {
                "type": 10,
                "content": `<:rose_Check:1486976983555379330> Successfully opened order ticket: ${channel}`
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
                      "url": "https://media.discordapp.net/attachments/1488365406069588159/1488367090221187212/Screenshot_2026-03-29_221112.png?ex=69cdd6de&is=69cc855e&hm=0e5536fef09bee026fb8f92625e5b310c1ff4a6bf214270db9d96f6d2a218923&=&format=webp&quality=lossless"
                    }
                  }
                ]
              }
            ]
          }
        ]
      });
    }
  }
};