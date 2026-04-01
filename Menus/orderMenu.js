const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} = require("discord.js");

module.exports = {
  customId: "p_286361033017135105",

  async execute(interaction) {
    const selected = interaction.values[0];

    const modal = new ModalBuilder()
      .setCustomId(`order_modal_${selected}`)
      .setTitle("Order");

    const budgetInput = new TextInputBuilder()
      .setCustomId("budget")
      .setLabel("Budget")
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setPlaceholder("500 Robux...");

    const descriptionInput = new TextInputBuilder()
      .setCustomId("description")
      .setLabel("Description")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true)
      .setPlaceholder("Description of your order...");

    const row1 = new ActionRowBuilder().addComponents(budgetInput);
    const row2 = new ActionRowBuilder().addComponents(descriptionInput);

    modal.addComponents(row1, row2);

    await interaction.showModal(modal);
  }
};