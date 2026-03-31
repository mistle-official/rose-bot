const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "course",

  async execute(message, args) {
    // ============ CONFIG ============
    const REQUIRED_ROLE_ID = "1466269101260411013";
    const TARGET_CHANNEL_ID = "1452801200113320037";

    const COURSE_STUDENT_ROLE = "1466311767771578388";

    const COURSE_ROLES = {
      graphics: "1466311768543592580",
      coding: "1466496048599142715",
      els: "1466312439644684451",
      livery: "1466312437971292262",
      clothing: "1466312437505724582",
      photography: "1466312439619387482"
    };

    const COURSE_DISPLAY_NAMES = {
      graphics: "Graphics",
      coding: "Coding",
      els: "ELS",
      livery: "Livery",
      clothing: "Clothing",
      photography: "Photography"
};

    // ================================
    const x = "<:sea_xMark:1466321094184276041>"

    // ===== PERMISSION CHECK =====
    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);

    if (!isAdmin && !hasRole) {
      return message.reply(
        `<:rose_xMark:1486977010143199382> You do **not** have **permission** to use this command.`
      );
    }

    // ===== ARGUMENTS =====
    const userId = args[0];
    const courseKey = args[1]?.toLowerCase();
    const displayCourse = COURSE_DISPLAY_NAMES[courseKey];


    if (!userId || !courseKey) {
      return message.reply(
        `<:rose_xMark:1486977010143199382> **Failed** to **fetch** the correct arguments.`
      );
    }

    const courseRoleId = COURSE_ROLES[courseKey];
    if (!courseRoleId) {
      return message.reply(
        `<:rose_xMark:1486977010143199382> **Invalid** course type.`
      );
    }

    let member;
    try {
      member = await message.guild.members.fetch(userId);
    } catch {
      return message.reply(`<:rose_xMark:1486977010143199382> Failed to **fetch** user from the **User ID* provided.`);
    }

    // ===== ADD ROLES =====
    await member.roles.add([
      COURSE_STUDENT_ROLE,
      courseRoleId
    ]);

    // ===== EMBED LOG =====
    const channel = message.guild.channels.cache.get(TARGET_CHANNEL_ID);
    if (!channel) return;


    await channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `## Course Purchase\nThank you <@${userId}> for purchasing the **${displayCourse} Course**. We hope you enjoy your course experience.`
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

    return message.reply(
      `<:rose_Check:1486976983555379330> **Successfully** enrolled <@${member.id}> in the **${displayCourse} Course**.`
    );
  }
};
