module.exports = {
  name: "rename",

  async execute(message, args) {
    if (message.author.bot) return;

    const REQUIRED_ROLE_ID = "PUT_STAFF_ROLE_ID_HERE";

    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);

    if (!isAdmin && !hasRole) {
      return message.reply({
        content: "<:rose_xMark:1488048189255716945> You do **not** have **permission** to use this command.",
        allowedMentions: { repliedUser: false }
      });
    }

    if (!message.channel.topic) {
      return message.reply({
        content: "<:rose_xMark:1488048189255716945> This channel does **not** have a valid ticket topic.",
        allowedMentions: { repliedUser: false }
      });
    }

    if (!/^\d+$/.test(message.channel.topic)) {
      return message.reply({
        content: "<:rose_xMark:1488048189255716945> This is not a valid **ticket** channel.",
        allowedMentions: { repliedUser: false }
      });
    }

    const newName = args[0]?.toLowerCase().replace(/[^a-z0-9-]/g, "");

    if (!newName) {
      return message.reply({
        content: "<:rose_xMark:1488048189255716945> **Failed** to detect a valid **channel name**.",
        allowedMentions: { repliedUser: false }
      });
    }

    try {
      await message.channel.setName(newName);

      await message.delete().catch(() => {});

      await message.channel.send({
        "flags": 32768,
        "components": [
          {
            "type": 17,
            "components": [
              {
                "type": 10,
                "content": `This **ticket** has been renamed to \`${newName}\`.`
              }
            ]
          }
        ]
      });
    } catch (err) {
      console.error(err);

      return message.reply({
        content: "<:rose_xMark:1488048189255716945> An **error** occurred while attempting to rename this ticket.",
        allowedMentions: { repliedUser: false }
      });
    }
  }
};