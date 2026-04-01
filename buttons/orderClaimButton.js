const CLAIM_ROLE_ID = "1477768302058143935";

module.exports = {
  customId: "p_286363526753161218",

  async execute(interaction) {
    if (!interaction.member.roles.cache.has(CLAIM_ROLE_ID)) {
      return interaction.reply({
        content: "<:rose_xMark:1486977010143199382> You do **not** have **permission** to claim orders.",
        ephemeral: true
      });
    }

    const updatedComponents = JSON.parse(JSON.stringify(interaction.message.components));

    for (const row of updatedComponents) {
      if (!row.components) continue;

      for (const component of row.components) {
        if (component.custom_id === "p_286363526753161218") {
          component.label = "Claimed";
          component.disabled = true;
          component.style = 3;
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
              "content": `<:rose_Check:1486976983555379330> Your order has been claimed by ${interaction.user}.`
            }
          ]
        }
      ]
    });
  }
};