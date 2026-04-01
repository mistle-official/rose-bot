module.exports = {
  name: "services",

  async execute(message, args) {

    const REQUIRED_ROLE_ID = "1488033002742353941";
    
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
                "url": "https://media.discordapp.net/attachments/1488365406069588159/1488367050085892146/Screenshot_2026-03-29_220956.png?ex=69cdd6d5&is=69cc8555&hm=9b2b2bb583d13b4db2c9d6a5540c1f58eef1460197c4b5e046f3c8462c385afc&=&format=webp&quality=lossless&width=1768&height=601"
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
          "content": "If you are looking to order with **.rose**, ensure to review our Order Terms below. Violating our Order Terms will result in your order being closed with no refund offered."
        },
        {
          "type": 1,
          "components": [
            {
              "flows": {},
              "type": 3,
              "options": [
                {
                  "label": "Graphics",
                  "value": "ZgLFV3EjJn"
                },
                {
                  "label": "Clothing",
                  "value": "XkhrSpToFM"
                },
                {
                  "label": "Liveries",
                  "value": "Q9WQ7lUW8w"
                },
                {
                  "label": "Discord",
                  "value": "ReTPQ65q1n"
                },
                {
                  "label": "Development",
                  "value": "dc65ZALgXP"
                }
              ],
              "placeholder": "Order Here",
              "custom_id": "p_286361033017135105",
              "min_values": 1,
              "max_values": 1
            }
          ]
        },
        {
          "type": 1,
          "components": [
            {
              "style": 1,
              "type": 2,
              "label": "Order Terms",
              "flow": {
                "actions": []
              },
              "custom_id": "p_286361083713687554"
            }
          ]
        }
      ]
    }
  ]
});
  }
};
