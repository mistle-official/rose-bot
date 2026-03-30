const {
  ChannelType,
  PermissionFlagsBits
} = require("discord.js");

module.exports = {
  customId: "help_modal",

  async execute(interaction) {
    const CATEGORY_ID = "1488039764157534218";
    const STAFF_ROLE_IDS = ["1488071288970023035", "1488033004562677930"];

    const reason = interaction.fields.getTextInputValue("help_reason");

    const username = interaction.user.username
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    const existing = interaction.guild.channels.cache.find(
      c => c.topic === interaction.user.id
    );

    if (existing) {
      return interaction.reply({
        content: `<:rose_xMark:1488048189255716945> You already have an open **ticket**: ${existing}`,
        flags: 64
      });
    }

    const staffRoles = STAFF_ROLE_IDS
      .map(roleId => interaction.guild.roles.cache.get(roleId))
      .filter(role => role);

    console.log("Resolved roles:", staffRoles.map(r => `${r.name} (${r.id})`));

    const overwrites = [
      {
        id: interaction.guild.id,
        deny: [PermissionFlagsBits.ViewChannel]
      },
      {
        id: interaction.user.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.AttachFiles,
          PermissionFlagsBits.EmbedLinks
        ]
      },
      ...staffRoles.map(role => ({
        id: role.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory,
          PermissionFlagsBits.AttachFiles,
          PermissionFlagsBits.EmbedLinks,
          PermissionFlagsBits.ManageChannels
        ]
      }))
    ];

    const channel = await interaction.guild.channels.create({
      name: `support-${username}`,
      type: ChannelType.GuildText,
      parent: CATEGORY_ID,
      topic: interaction.user.id,
      permissionOverwrites: overwrites
    });

    await interaction.reply({
  ephemeral: true,
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `<:rose_check:1488048137355526304> Your ticket has been created successfully: ${channel}`
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
                    "url": "https://media.discordapp.net/attachments/1488043526448218233/1488091891126767656/image.png?ex=69cb8512&is=69ca3392&hm=140e1b168b6c1679050eea995554191eb1ce4fbfb1ff2fa50015338e60ea2395&=&format=webp&quality=lossless&width=550&height=187"
                  }
                }
              ]
            },
            {
              "type": 10,
              "content": `@everyone | <@${interaction.user.id}>`
            },
            {
              "type": 14,
              "spacing": 2
            },
            {
              "type": 10,
              "content": `A support ticket has been opened. Ensure to follow the guidelines listed below to avoid ticket closure.\n\n**Ticket Guidelines**\n- Do not ping anyone; staff have already been notified\n- Remain respectful within your ticket\n- Remain active within your ticket\n\n**Inquiry**\n${reason}`
            },
            {
              "type": 14,
              "divider": false
            },
            {
              "type": 1,
              "components": [
                {
                  "style": 4,
                  "type": 2,
                  "label": "Close",
                  "flow": {
                    "actions": []
                  },
                  "custom_id": "p_285689439538122754"
                }
              ]
            }
          ]
        }
      ]
    });
  }
};