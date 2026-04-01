const CLAIM_ROLE_ID = "1477768302058143935";

module.exports = {
  customId: "p_286363526753161218",

  async execute(interaction) {
    if (!interaction.channel.topic || !interaction.channel.topic.startsWith("order-")) {
      return interaction.reply({
        content: "<:rose_xMark:1486977010143199382> This button can only be used in **order tickets**.",
        flags: 64
      });
    }

    const isAdmin = interaction.member.permissions.has("Administrator");
    const hasRole = interaction.member.roles.cache.has(CLAIM_ROLE_ID);

    if (!isAdmin && !hasRole) {
      return message.reply("<:rose_xMark:1486977010143199382> You do **not** have **permission** to use this command.");
    }


    const updatedComponents = JSON.parse(JSON.stringify(interaction.message.components));

    for (const container of updatedComponents) {
      if (!container.components) continue;

      for (const item of container.components) {
        if (item.type === 1 && Array.isArray(item.components)) {
          for (const component of item.components) {
            if (component.custom_id === "p_286363526753161218") {
              component.label = "Claimed";
              component.disabled = true;
              component.style = 3;
            }
          }
        }
      }
    }

    await interaction.message.edit({
      components: updatedComponents
    });

    await interaction.reply({
      "flags": 32768,
      "components": [
        {
          "type": 17,
          "components": [
            {
              "type": 10,
              "content": `<:rose_Check:1486976983555379330> ${interaction.user} has claimed this order.`
            }
          ]
        }
      ]
    });
  }
};