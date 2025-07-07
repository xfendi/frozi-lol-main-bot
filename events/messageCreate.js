const { prefix } = require("../config.json");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.author.bot) return;

    if (!message.content.startsWith(prefix))
      return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
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
