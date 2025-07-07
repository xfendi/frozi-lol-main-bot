const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`[INFO] Discord.js bot is ready!`.green);
    console.log(`[INFO] Logged in as ${client.user.tag}`.blue);

    client.user.setPresence({
      activities: [{ name: "Create your own bio!", type: 0 }], // Type 0 = "Playing"
      status: "online", // "online" | "idle" | "dnd" | "invisible"
    });
  },
};