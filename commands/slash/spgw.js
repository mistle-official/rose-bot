const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  PermissionFlagsBits
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spgw")
    .setDescription("Start a sponsored giveaway."),

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

    const modal = new ModalBuilder()
      .setCustomId("spgw_modal")
      .setTitle("Sponsored Giveaway");

    const prizeInput = new TextInputBuilder()
      .setCustomId("spgw_prize")
      .setLabel("Prize")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("1000 Robux")
      .setRequired(true)
      .setMaxLength(100);

    const winnersInput = new TextInputBuilder()
      .setCustomId("spgw_winners")
      .setLabel("Amount of Winners")
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setMaxLength(3)
      .setPlaceholder("1");

    const durationInput = new TextInputBuilder()
      .setCustomId("spgw_duration")
      .setLabel("Duration")
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setMaxLength(50)
      .setPlaceholder("7 days, 2h, 1m, 10s");

    const linkInput = new TextInputBuilder()
      .setCustomId("spgw_link")
      .setLabel("Server Invite")
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setMaxLength(200)
      .setPlaceholder("https://discord.gg/...");

    modal.addComponents(
      new ActionRowBuilder().addComponents(prizeInput),
      new ActionRowBuilder().addComponents(winnersInput),
      new ActionRowBuilder().addComponents(durationInput),
      new ActionRowBuilder().addComponents(linkInput)
    );

    await interaction.showModal(modal);
  }
};