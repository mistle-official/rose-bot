const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const buttonsPath = path.join(__dirname, "..", "buttons");

  if (!fs.existsSync(buttonsPath)) return;

  const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith(".js"));

  for (const file of buttonFiles) {
    const button = require(path.join(buttonsPath, file));

    if (!button.customId) continue;

    client.buttons.set(button.customId, button);
    console.log(`[BUTTON] Loaded ${button.customId}`);
  }
};