const { EmbedBuilder } = require("discord.js");
const Config = require("../../config.json");

module.exports = {
  name: "leaderboard",
  description: "Display top viewed profiles on our platform",
  async execute(message, args, client) {
    let leaderboardData;

    try {
      const res = await fetch("https://frozi.lol/api/leaderboard");
      const data = await res.json();

      leaderboardData = data.topProfiles || [];
    } catch (err) {
      console.error("Failed to load leaderboard", err);
    }

    const embed = new EmbedBuilder()
      .setColor(Config.embedColorPrimary)
      .setTitle("Leaderboard List")
      .setDescription(
        [
          `> Top viewed profiles on our platform`,
          ``,
          ...leaderboardData.map(
            (profile, index) =>
              `> ${index + 1}. **[@${
                profile.username || "Unknown"
              }](https://frozi.lol/${profile.username || ""})** - ${
                profile.viewsCount
              } views`
          ),
        ].join("\n")
      )

      .setFooter({ text: Config.footerText })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
