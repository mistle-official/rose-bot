const axios = require("axios");

module.exports = {
  name: "funds",

  async execute(message) {
    if (message.author.bot) return;

    // ============== CONFIG ==============
    const REQUIRED_ROLE_ID = "1488033001374748742";
    const GROUP_ID = process.env.ROBLOX_GROUP_ID;
    const ROBLOSECURITY = process.env.RBX_COOKIE;
    // ====================================

    // ===== PERMISSIONS (ADMIN OR ROLE) =====
    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has(REQUIRED_ROLE_ID);

    if (!isAdmin && !hasRole) {
      return message.reply("<:rose_xMark:1486977010143199382> You do **not** have **permission** to use this command.");
    }

    if (!ROBLOSECURITY || !GROUP_ID) {
      return message.reply("<:rose_xMark:1486977010143199382> Bot is **not** configured correctly.");
    }

    const headers = {
      Cookie: `.ROBLOSECURITY=${ROBLOSECURITY}`
    };

    try {
      // ===== CURRENT FUNDS =====
      const currentFundsRes = await axios.get(
        `https://economy.roblox.com/v1/groups/${GROUP_ID}/currency`,
        { headers }
      );

      // ===== PENDING FUNDS =====
      const pendingFundsRes = await axios.get(
        `https://economy.roblox.com/v1/groups/${GROUP_ID}/revenue/summary/Day`,
        { headers }
      );

      const currentFunds = currentFundsRes.data.robux ?? 0;
      const pendingFunds = pendingFundsRes.data.pendingRobux ?? 0;
      const totalFunds = currentFunds + pendingFunds;

      // Optional: delete trigger

      await message.reply({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# Group Funds"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `**Current Funds**\n${currentFunds.toLocaleString()} ROBUX`
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 10,
          "content": `**Incoming Funds**\n${pendingFunds.toLocaleString()} ROBUX`
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 10,
          "content": `**Total Funds**\n${totalFunds.toLocaleString()} ROBUX`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1488043526448218233/1488044260874780712/Screenshot_2026-03-29_221112.png?ex=69cb58b6&is=69ca0736&hm=8fc5e7f9fb255acf0b6e195484f7bf8d33021eb9cbf0176eda72aa47c588a448&=&format=webp&quality=lossless"
              }
            }
          ]
        }
      ]
    }
  ]
});

    } catch (error) {
      console.error("FUNDS ERROR:", error.response?.data || error);
      await message.channel.send("<:rose_xMark:1486977010143199382> **Failed** to **fetch** group funds.");
    }
  }
};



