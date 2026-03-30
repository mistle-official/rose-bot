module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
    try {
      if (interaction.isChatInputCommand()) {
        const command = client.slashCommands.get(interaction.commandName);
        if (!command) return;
        await command.execute(interaction);
        return;
      }

      if (interaction.isButton()) {
        const button = client.buttons.get(interaction.customId);
        if (!button) return;
        await button.execute(interaction);
        return;
      }

      if (interaction.isStringSelectMenu()) {
        const menu = client.menus.get(interaction.customId);
        if (!menu) return;
        await menu.execute(interaction);
        return;
      }

      if (interaction.isModalSubmit()) {
        const modal = client.modals.get(interaction.customId);
        if (!modal) return;
        await modal.execute(interaction);
        return;
      }

    } catch (error) {
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "<:rose_xMark:1488048189255716945> An **error** occurred while processing this interaction.",
          flags: 64
        }).catch(() => {});
      } else {
        await interaction.reply({
          content: "<:rose_xMark:1488048189255716945> An **error** occurred while processing this interaction.",
          flags: 64
        }).catch(() => {});
      }
    }
  }
};