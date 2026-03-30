module.exports = {
  name: "group",

  async execute(message, args) {

    const REQUIRED_ROLE_ID = "1488033002742353941";
    
    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);

    if (!isAdmin && !hasRole) {
      return message.reply("<:rose_xMark:1488048189255716945> You do **not** have **permission** to use this command.");
    }
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
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1488043526448218233/1488044051088412732/Screenshot_2026-03-29_220902.png?ex=69cb5884&is=69ca0704&hm=c662605e22fc8f37b8f1a9a72c01d5fbc7495b02dc3281535d35c6a55903168a&=&format=webp&quality=lossless&width=1872&height=639"
              }
            }
          ]
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": "Welcome to **.rose** — your go-to ER:LC service & product provider. We provide top-notch products for our customers at cheap prices. Contact our team below, view our guidelines, or learn more information below."
        },
        {
          "type": 1,
          "components": [
            {
              "flows": {},
              "type": 3,
              "options": [
                {
                  "label": "Server Information",
                  "value": "Ba8dJzTxSI"
                },
                {
                  "label": "Guidelines",
                  "value": "guaYRHQgON"
                }
              ],
              "placeholder": "Information Index",
              "custom_id": "p_285683689298333702",
              "min_values": 1,
              "max_values": 1
            }
          ]
        },
        {
          "type": 1,
          "components": [
            {
              "style": 4,
              "type": 2,
              "label": "Help",
              "flow": {
                "actions": []
              },
              "custom_id": "p_285683797037420551"
            },
            {
              "type": 2,
              "style": 5,
              "label": "Roblox Group",
              "url": "https://www.roblox.com/communities/233927725/rose-I-Roblox-Group#!/about"
            }
          ]
        }
      ]
    }
  ]
});
  }
};
