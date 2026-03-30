module.exports = {
  name: "group",

  async execute(message, args) {
    if (message.author.bot) return;

     try {
      await message.delete();
    } catch {}

    await message.channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "Join our **ROBLOX** group [here](https://www.roblox.com/communities/233927725/rose-I-Roblox-Group#!/about)"
        },
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "Link",
              "url": "https://www.roblox.com/communities/233927725/rose-I-Roblox-Group#!/about",
            }
          ]
        }
      ]
    }
  ]
});
  }
};
