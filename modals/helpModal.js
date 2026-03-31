const {
  ChannelType,
  PermissionFlagsBits
} = require("discord.js");

module.exports = {
  customId: "help_modal",

  async execute(interaction) {
    const CATEGORY_ID = "1466318527609831525";
    const STAFF_ROLE_IDS = ["1466269101260411013", "1466310900121337856"];

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
          "content": `<:rose_Check:1486976983555379330> Your ticket has been created successfully: ${channel}`
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
                "url": "https://media.discordapp.net/attachments/1488043526448218233/1488044260874780712/Screenshot_2026-03-29_221112.png?ex=69cc0176&is=69caaff6&hm=fa20565a2965f701a1882c8090998571c7628f26242cbebaa86a0bdd1eb749b7&=&format=webp&quality=lossless"
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
                    "url": "https://media.discordapp.net/attachments/1488043526448218233/1488091891126767656/image.png?ex=69cc2dd2&is=69cadc52&hm=449d506b02c66dacaba7acf972e0915320176b8e213ec9ab074be925c0c2328b&=&format=webp&quality=lossless&width=550&height=187"
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