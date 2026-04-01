const CLAIM_ROLE_IDS = [ "1477768302058143935", "1466269101260411013"] ;

module.exports = {
  name: "unclaim",

  async execute(message) {
    if (!message.channel.topic || !message.channel.topic.startsWith("order-")) {
      return message.reply("<:rose_xMark:1486977010143199382> This command can only be used in **order tickets**.");
    }

    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has(CLAIM_ROLE_IDS);

    if (!isAdmin && !hasRole) {
      return message.reply("<:rose_xMark:1486977010143199382> You do **not** have **permission** to use this command.");
    }

    const messages = await message.channel.messages.fetch({ limit: 25 });
    const panelMessage = messages.find(msg =>
      msg.author.id === message.client.user.id &&
      msg.components?.length &&
      JSON.stringify(msg.components).includes("p_286363526753161218")
    );

    if (!panelMessage) {
      return message.reply("<:rose_xMark:1486977010143199382> No active order panel found in this ticket.");
    }

    const updatedComponents = JSON.parse(JSON.stringify(panelMessage.components));

    for (const container of updatedComponents) {
      if (!container.components) continue;

      for (const item of container.components) {
        if (item.type === 1 && Array.isArray(item.components)) {
          for (const component of item.components) {
            if (component.custom_id === "p_286363526753161218") {
              component.label = "Claim";
              component.disabled = false;
              component.style = 2;
            }
          }
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
              "content": `<:rose_Check:1486976983555379330> ${message.author} has unclaimed this order.`
            }
          ]
        }
      ]
    });
  }
};