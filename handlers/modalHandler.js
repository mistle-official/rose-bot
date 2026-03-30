const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const modalsPath = path.join(__dirname, "..", "modals");

  if (!fs.existsSync(modalsPath)) return;

  const modalFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith(".js"));

  for (const file of modalFiles) {
    const modal = require(path.join(modalsPath, file));

    if (!modal.customId) continue;

    client.modals.set(modal.customId, modal);
    console.log(`[MODAL] Loaded ${modal.customId}`);
  }
};