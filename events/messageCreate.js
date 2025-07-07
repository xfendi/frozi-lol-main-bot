const Config = require("../config.json");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.author.bot || message.guild.id !== Config.serverId) return;

    if (!message.content.startsWith(Config.prefix)) return;

    const args = message.content.slice(Config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      command.execute(message, args, client);
    } catch (err) {
      console.error(err);
      message.reply("❌ Something went wrong while executing the command.");
    }
  },
};
