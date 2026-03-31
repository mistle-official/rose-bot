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
  name: "remove",

  async execute(message, args) {

    if (message.author.bot) return;

    const REQUIRED_ROLE_ID = "1466269101260411013";

    const STAFF_ROLE_IDS = [
      "1488033001374748742",
      "1488033002742353941",
      "1488033002905796779",
      "1488033003463639040",
      "1488033004562677930",
      "1488033005019861103",
      "1488033005829361694",
      "1488033006470824086",
      "1488033244103311410",
      "1488033007184121947",
      "1488033009906089994",
      "1488033007855206400",
      "1488033008790274090",
      "1488033009440391219",
      "1488033009524408462",
      "1488033010749149305",
      "1488033011076169749",
      "1488033011776749770",
      "1488033012502364272",
      "1488033013010010305",
      "1488033013626306702",
      "1488071288970023035",
      "1488071288391073893",
      "1488071290207080499",
      "1488071289423003688",
      "1488033228785844315",
      "1488033230128152657",
      "1488033230270758923"
    ];

    // 🔹 LOG CHANNEL
    const LOG_CHANNEL_ID = "1487544231617630209";

    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);

    if (!isAdmin && !hasRole) {
      return message.reply({
        content: "<:rose_xMark:1486977010143199382> You do **not** have **permission** to use this command.",
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

    // 🔥 roles to remove
    const rolesToRemove = STAFF_ROLE_IDS.filter(roleId =>
      target.roles.cache.has(roleId)
    );

    if (!rolesToRemove.length) {
      return message.reply({
        content: "<:rose_xMark:1488048189255716945> User is **not** a **staff** member.",
        allowedMentions: { repliedUser: false }
      });
    }

    try {

      const removedRolesData = loadRemovedRoles();

      removedRolesData[target.id] = {
        roles: rolesToRemove,
        removedBy: message.author.id,
        removedAt: Date.now()
      };

      saveRemovedRoles(removedRolesData);

      await target.roles.remove(rolesToRemove);

      // optional nickname reset
      try {
        await target.setNickname(null);
      } catch {}

      // 🔹 LOG CHANNEL
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
                  "content": `${target} (\`${target.id}\`) has been **removed** as an employee at **.rose**.`
                }
              ]
            }
          ]
        });
      }

      // 🧹 delete command
      try {
        await message.delete();
      } catch {}

      try {
        await target.send("<:rose_arrow:1488072734788419625> You have been **removed** from the **Staff Team**.");
      } catch {}

      // ✅ confirmation
      await message.channel.send(
        `<:rose_check:1488048137355526304> **Successfully** removed ${target} from the staff team.`
      );

    } catch (err) {
      console.error(err);

      message.reply({
        content: "<:rose_xMark:1488048189255716945> An **error** occured while attempting to remove the user's roles.",
        allowedMentions: { repliedUser: false }
      });
    }

  }
};