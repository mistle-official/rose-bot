const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "..", "removedRoles.json");

function loadRemovedRoles() {
  if (!fs.existsSync(DATA_FILE)) return {};
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function saveRemovedRoles(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

module.exports = {
  name: "restore",

  async execute(message, args) {

    if (message.author.bot) return;

    // 🔹 REQUIRED ROLE
    const REQUIRED_ROLE_ID = "1488033004562677930";

    // 🔹 LOG CHANNEL
    const LOG_CHANNEL_ID = "1487544231617630209";

    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);

    if (!isAdmin && !hasRole) {
      return message.reply({
        content: "<:rose_xMark:1488048189255716945> You do **not** have **permission** to use this command.",
        allowedMentions: { repliedUser: false }
      });
    }

    const userId = args[0];

    if (!userId) {
      return message.reply({
        content: "**<:rose_xMark:1488048189255716945> Failed** to detect a valid **user ID**.",
        allowedMentions: { repliedUser: false }
      });
    }

    let target;

try {
  target = await message.guild.members.fetch(userId);
} catch {
  return message.reply({
    content: "<:rose_xMark:1488048189255716945> **Failed** to fetch user.",
    allowedMentions: { repliedUser: false }
  });
}

    try {

      const removedRolesData = loadRemovedRoles();
      const savedData = removedRolesData[target.id];

      if (!savedData || !savedData.roles || !savedData.roles.length) {
        return message.reply({
          content: "<:rose_xMark:1488048189255716945> No saved **removed roles** were found for this user.",
          allowedMentions: { repliedUser: false }
        });
      }

      const validRoles = savedData.roles.filter(roleId =>
        message.guild.roles.cache.has(roleId)
      );

      if (!validRoles.length) {
        return message.reply({
          content: "<:rose_xMark:1488048189255716945> Failed to restore any roles for this user.",
          allowedMentions: { repliedUser: false }
        });
      }

      await target.roles.add(validRoles);

      delete removedRolesData[target.id];
      saveRemovedRoles(removedRolesData);

      const logChannel = message.guild.channels.cache.get(LOG_CHANNEL_ID);

      if (logChannel) {
        await logChannel.send({
          "flags": 32768,
          "components": [
            {
              "type": 17,
              "components": [
                {
                  "type": 10,
                  "content": `${target} (\`${target.id}\`) was **restored** to the team, and their previous roles have been **reverted**.`
                }
              ]
            }
          ]
        });
      }

      try {
        await message.delete();
      } catch {}

      try {
        await target.send("<:rose_arrow:1488072734788419625> Your previous **Staff Team** roles have been restored.");
      } catch {}

      await message.channel.send(
        `<:rose_check:1488048137355526304> **Successfully** restored saved staff roles to ${target}.`
      );

    } catch (err) {
      console.error(err);

      message.reply({
        content: "<:rose_xMark:1488048189255716945> An **error** occured while attempting to restore the user's roles.",
        allowedMentions: { repliedUser: false }
      });
    }

  }
};