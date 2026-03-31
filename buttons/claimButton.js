const {
  ChannelType,
  PermissionFlagsBits
} = require("discord.js");

module.exports = {
  customId: "YOUR_CLAIM_BUTTON_ID",

  async execute(interaction) {
    const CATEGORY_ID = "1488415049713324032";
    const STAFF_ROLE_ID = "1466269101260411013";

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

    const staffRole = interaction.guild.roles.cache.get(STAFF_ROLE_ID);

    if (!staffRole) {
      return interaction.reply({
        content: "<:rose_xMark:1488048189255716945> **Failed** to find the configured staff role.",
        flags: 64
      });
    }

    const channel = await interaction.guild.channels.create({
      name: `claim-${username}`,
      type: ChannelType.GuildText,
      parent: CATEGORY_ID,
      topic: interaction.user.id,
      permissionOverwrites: [
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
        {
          id: staffRole.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
            PermissionFlagsBits.AttachFiles,
            PermissionFlagsBits.EmbedLinks,
            PermissionFlagsBits.ManageChannels
          ]
        }
      ]
    });

    await interaction.reply({
      "flags": 32832,
      "components": [
        {
          "type": 17,
          "components": [
            {
              "type": 10,
              "content": `<:rose_check:1488048137355526304> Your claim ticket has been created successfully: ${channel}`
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
                    "url": "https://media.discordapp.net/attachments/1488365406069588159/1488415599037124760/image.png?ex=69ccb28c&is=69cb610c&hm=ba93c35f4050e568658ceec819dd2a45fd08dfc531131e97a3e08503999d1eb8&=&format=webp&quality=lossless"
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
              "content": "A purchase claim has been opened. Ensure to provide the needed proof of your purchase so our team can grant you your perks as soon as possible.\n\n**Ticket Guidelines**\n- Do not ping anyone; staff have already been notified\n- Remain respectful within your ticket\n- Remain active within your ticket"
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