const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const menusPath = path.join(__dirname, "..", "menus");

  if (!fs.existsSync(menusPath)) {
    console.log("[MENU] menus folder not found");
    return;
  }

  const menuFiles = fs.readdirSync(menusPath).filter(file => file.endsWith(".js"));

  for (const file of menuFiles) {
    const menu = require(path.join(menusPath, file));

    if (!menu.customId) continue;

    client.menus.set(menu.customId, menu);
    console.log(`[MENU] Loaded ${menu.customId}`);
  }
};