module.exports = {
  name: "interactionCreate",
  async execute(client, interaction) {
    try {
      // Slash Commands
      if (interaction.isChatInputCommand()) {
        const command = client.slashCommands.get(interaction.commandName);
        if (!command) return;

        await command.execute(interaction);
      }

      // Buttons
      if (interaction.isButton()) {
        const button = client.buttons.get(interaction.customId);
        if (!button) return;

        await button.execute(interaction);
      }

      // Modals
      if (interaction.isModalSubmit()) {
        const modal = client.modals.get(interaction.customId);
        if (!modal) return;

        await modal.execute(interaction);
      }
    } catch (error) {
      console.error(`interactionCreate error:`, error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while processing this interaction.",
          ephemeral: true
        }).catch(() => {});
      } else {
        await interaction.reply({
          content: "There was an error while processing this interaction.",
          ephemeral: true
        }).catch(() => {});
      }
    }
  }
};