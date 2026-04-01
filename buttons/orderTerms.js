const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  customId: "p_286361083713687554",

  async execute(interaction) {


      await interaction.reply({
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
                "url": "https://media.discordapp.net/attachments/1488365406069588159/1488765486094090240/image.png?ex=69cdf867&is=69cca6e7&hm=2737257a4710761a385182de44192380748231580f1feca2fbbc076b2b8948dd&=&format=webp&quality=lossless&width=1872&height=638"
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
          "content": "` #1 ` **Payment Upfront**\n- You are expected to pay **100%** upfront, before the designer starts to work on your order.\n- No exceptions will be made.\n\n` #2 ` **Respect**\n- You are required to show respect to your designer.\n- Disrespect will result in your order being closed.\n- Our designers have lives outside of Discord, meaning delays may occasionally occur.\n\n` #3 ` **Unauthorized Distribution of Products**\n- We do not permit the unauthorized use of products for another service.\n- Any products crafted by our designers may not be sold or reused to someone who is not the proper client of this order unless given explicit permission by the designer.\n\n` #4 ` **Refunds**\n- Refunds will not be offered unless an error occurs on our side.\n- If the designer backs out of the order, retires, or gets terminated during an active order, we will work to find a replacement order.\n- If we fail to find one within **3 days** of the order being unclaimed, we will offer 100% store/order credit."
        }
      ]
    }
  ]
});

 
}

}