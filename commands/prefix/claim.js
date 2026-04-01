const CLAIM_ROLE_ID = "1477768302058143935";

module.exports = {
  name: "claim",

  async execute(message) {
    if (!message.member.roles.cache.has(CLAIM_ROLE_ID)) {
      return message.reply("<:rose_xMark:1486977010143199382> You do **not** have **permission** to claim orders.");
    }

    const messages = await message.channel.messages.fetch({ limit: 25 });
    const panelMessage = messages.find(msg =>
      msg.author.id === message.client.user.id &&
      msg.components?.length &&
      JSON.stringify(msg.components).includes("p_286363526753161218")
    );

    if (!panelMessage) {
      return message.reply("<:rose_xMark:1486977010143199382> **Failed** to **fetch** order panel.");
    }

    const updatedComponents = JSON.parse(JSON.stringify(panelMessage.components));

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

    await panelMessage.edit({
      components: updatedComponents
    });

    await message.channel.send({
      "flags": 32768,
      "components": [
        {
          "type": 17,
          "components": [
            {
              "type": 10,
              "content": `<:rose_Check:1486976983555379330> Your order has been claimed by ${message.author}.`
            }
          ]
        }
      ]
    });
  }
};