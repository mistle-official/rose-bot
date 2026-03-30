const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const prefixPath = path.join(__dirname, "..", "commands", "prefix");
  const slashPath = path.join(__dirname, "..", "commands", "slash");

  // Prefix Commands
  if (fs.existsSync(prefixPath)) {
    const prefixFiles = fs.readdirSync(prefixPath).filter(file => file.endsWith(".js"));

    for (const file of prefixFiles) {
      const command = require(path.join(prefixPath, file));

      if (!command.name) continue;

      client.prefixCommands.set(command.name, command);
      console.log(`[PREFIX] Loaded ${command.name}`);
    }
  }

  // Slash Commands
  if (fs.existsSync(slashPath)) {
    const slashFiles = fs.readdirSync(slashPath).filter(file => file.endsWith(".js"));

    for (const file of slashFiles) {
      const command = require(path.join(slashPath, file));

      if (!command.data || !command.data.name) continue;

      client.slashCommands.set(command.data.name, command);
      console.log(`[SLASH] Loaded ${command.data.name}`);
    }
  }
};