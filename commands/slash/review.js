const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("review")
    .setDescription("Leave a review for a recent order.")

    .addUserOption(option =>
      option
        .setName("designer")
        .setDescription("Select the designer who completed your order.")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("product")
        .setDescription("Select the product you ordered.")
        .setRequired(true)
        .addChoices(
          { name: "Graphics", value: "Graphics" },
          { name: "Clothing", value: "Clothing" },
          { name: "Liveries", value: "Liveries" },
          { name: "Discord", value: "Discord" },
          { name: "Development", value: "Development" }
        )
    )

    .addStringOption(option =>
      option
        .setName("rating")
        .setDescription("Select the rating of your order experience.")
        .setRequired(true)
        .addChoices(
          { name: "⭐", value: "⭐" },
          { name: "⭐⭐", value: "⭐⭐" },
          { name: "⭐⭐⭐", value: "⭐⭐⭐" },
          { name: "⭐⭐⭐⭐", value: "⭐⭐⭐⭐" },
          { name: "⭐⭐⭐⭐⭐", value: "⭐⭐⭐⭐⭐" }
        )
    )

    .addStringOption(option =>
      option
        .setName("feedback")
        .setDescription("Input feedback for your order experience.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const REQUIRED_ROLE_ID = "1488033235215585361";

    const isAdmin = interaction.member.permissions.has(PermissionFlagsBits.Administrator);
    const hasRole = interaction.member.roles.cache.has(REQUIRED_ROLE_ID);

    if (!isAdmin && !hasRole) {
      return interaction.reply({
        content: "<:rose_xMark:1488048189255716945> You must be a **customer** to **leave** a review.",
        flags: 64
      });
    }

    const designer = interaction.options.getUser("designer");
    const product = interaction.options.getString("product");
    const rating = interaction.options.getString("rating");
    const feedback = interaction.options.getString("feedback");

    const TARGET_CHANNEL_ID = "1488040843242639401";
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
          "type": 17,
          "components": [
            {
              "type": 12,
              "items": [
                {
                  "media": {
                    "url": "https://media.discordapp.net/attachments/1488043526448218233/1488044119682187386/Screenshot_2026-03-29_221003.png?ex=69cb5894&is=69ca0714&hm=26d1953c7a6c0fe84db2de48226004ed1f04b2bfd9c82dab2f377a9971109772&=&format=webp&quality=lossless&width=1872&height=638"
                  }
                }
              ]
            },
            {
              "type": 14,
              "spacing": 2
            },
            {
              "type": 10,
              "content": `${interaction.user} is the client of this order.`
            },
            {
              "type": 14,
              "divider": false
            },
            {
              "type": 10,
              "content": `**Designer**: ${designer}\n**Product**: ${product}\n**Rating**: ${rating}\n**Feedback**: ${feedback}\n\nThank you for ordering with **.rose**. We hope you enjoyed your order experience.`
            }
          ]
        }
      ]
    });

    try {
      await designer.send(`<:rose_arrow:1488072734788419625>You have received a review from ${interaction.user}, a recent client you completed an order for.`);
    } catch {}

    await interaction.reply({
      content: "<:rose_check:1488048137355526304> **Successfully** sent review. Thanks for ordering with **.rose**.",
      flags: 64
    });
  }
};