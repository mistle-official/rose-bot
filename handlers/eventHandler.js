const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const eventsPath = path.join(__dirname, "..", "events");

  if (!fs.existsSync(eventsPath)) return;

  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));

    if (!event.name || !event.execute) continue;

    client.on(event.name, (...args) => event.execute(client, ...args));
    console.log(`[EVENT] Loaded ${event.name}`);
  }
};