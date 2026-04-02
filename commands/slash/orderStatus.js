const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("order-status")
    .setDescription("Set the status of each type of order.")


    .addStringOption(option =>
      option
        .setName("graphics")
        .setDescription("Order status for graphics.")
        .setRequired(true)
        .addChoices(
          { name: "Open", value: "Open" },
          { name: "Closed", value: "Closed" },
          { name: "Rose Plus", value: "Rose Plus" }
        )
    )

    .addStringOption(option =>
      option
        .setName("liveries")
        .setDescription("Order status for liveries.")
        .setRequired(true)
        .addChoices(
          { name: "Open", value: "Open" },
          { name: "Closed", value: "Closed" },
          { name: "Rose Plus", value: "Rose Plus" }
        )
    )

    .addStringOption(option =>
      option
        .setName("clothing")
        .setDescription("Order status for clothing.")
        .setRequired(true)
        .addChoices(
          { name: "Open", value: "Open" },
          { name: "Closed", value: "Closed" },
          { name: "Rose Plus", value: "Rose Plus" }
        )
    )

    .addStringOption(option =>
      option
        .setName("discord")
        .setDescription("Order status for discord.")
        .setRequired(true)
        .addChoices(
          { name: "Open", value: "Open" },
          { name: "Closed", value: "Closed" },
          { name: "Rose Plus", value: "Rose Plus" }
        )
    )
    
    .addStringOption(option =>
      option
        .setName("development")
        .setDescription("Order status for development.")
        .setRequired(true)
        .addChoices(
          { name: "Open", value: "Open" },
          { name: "Closed", value: "Closed" },
          { name: "Rose Plus", value: "Rose Plus" }
        )
    ),



  async execute(interaction) {
    const REQUIRED_ROLE_ID = "1466268852647235604";

    const isAdmin = interaction.member.permissions.has(PermissionFlagsBits.Administrator);
    const hasRole = interaction.member.roles.cache.has(REQUIRED_ROLE_ID);

    if (!isAdmin && !hasRole) {
      return interaction.reply({
        content: "<:rose_xMark:1488048189255716945> You do **not** have **permission** to use this command.",
        flags: 64
      });
    }

    const graphics = interaction.options.getString("graphics");
    const liveries = interaction.options.getString("liveries");
    const clothing = interaction.options.getString("clothing");
    const discord = interaction.options.getString("discord");
    const development = interaction.options.getString("development");

    const TARGET_CHANNEL_ID = "1486902840277336144";
    const channel = interaction.guild.channels.cache.get(TARGET_CHANNEL_ID);

    if (!channel) {
      return interaction.reply({
        content: "<:rose_xMark:1488048189255716945> **Failed** to find the configured **reviews channel**.",
        flags: 64
      });
    }

    await channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 10,
      "content": `# Order Status\n-# <@&1319810380783943822>\n\n**Graphics**: ${graphics}\n**Clothing** ${clothing}\n**Liveries** ${liveries}\n**Discord**: ${discord}\n**Development**: ${development}`
    }
  ]
});


    await interaction.reply({
      content: "<:rose_check:1488048137355526304> **Successfully** sent updated order status.",
      flags: 64
    });
  }
};