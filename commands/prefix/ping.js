module.exports = {
  name: "ping",

  async execute(message) {
    if (message.author.bot) return;

    const latency = message.client.ws.ping;

    await message.reply({
      "flags": 32768,
      "components": [
        {
          "type": 17,
          "components": [
            {
              "type": 10,
              "content": `## Bot Stats\n**Status**: Online\n**Latency**: \`${latency}ms\``
            }
          ]
        }
      ]
    });
  }
};