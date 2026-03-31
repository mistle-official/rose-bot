module.exports = {
  name: "dashboard",

  async execute(message, args) {

    const REQUIRED_ROLE_ID = "1466268742546751694";
    
    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);

    if (!isAdmin && !hasRole) {
      return message.reply("<:rose_xMark:1486977010143199382> You do **not** have **permission** to use this command.");
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
                "url": "https://media.discordapp.net/attachments/1488365406069588159/1488367048898646126/Screenshot_2026-03-29_220927.png?ex=69cc8554&is=69cb33d4&hm=fb28dd0e657841f85e73cd85777181c1727f8f374420c2f9af21d6a861315dfb&=&format=webp&quality=lossless"
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
          "content": "If you are looking to purchase an item from our shop ensure to review our **Purchase Policy** below.\n"
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 9,
          "components": [
            {
              "type": 10,
              "content": "<:rose_Clipboard:1486965634611806299> **Purchase Policy**\n- You must redeem your perks within 3 days of purchase\n- No refunds will be offered, all sales final\n- Perks & prices will not be modified"
            }
          ],
          "accessory": {
            "style": 1,
            "type": 2,
            "label": "Claim",
            "flow": {
              "actions": []
            },
            "custom_id": "p_286010368373821442"
          }
        },
        {
          "type": 1,
          "components": [
            {
              "flows": {
                "jgM5b4KwBY": {
                  "actions": [
                    {
                      "type": 0
                    }
                  ]
                },
                "FKbgxEuOoJ": {
                  "actions": [
                    {
                      "type": 0
                    }
                  ]
                },
                "L6DwSs4I57": {
                  "actions": [
                    {
                      "type": 0
                    }
                  ]
                },
                "nb0q3a4qa1": {
                  "actions": [
                    {
                      "type": 0
                    }
                  ]
                }
              },
              "type": 3,
              "options": [
                {
                  "label": "Advertisements",
                  "value": "jgM5b4KwBY"
                },
                {
                  "label": "rose+",
                  "value": "FKbgxEuOoJ"
                },
                {
                  "label": "Donations",
                  "value": "L6DwSs4I57"
                },
                {
                  "label": "Booster Perks",
                  "value": "nb0q3a4qa1"
                }
              ],
              "placeholder": "Server Store",
              "custom_id": "p_285971318715715587",
              "min_values": 1,
              "max_values": 1
            }
          ]
        }
      ]
    }
  ]
})
}

};