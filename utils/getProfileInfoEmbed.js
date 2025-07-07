const { EmbedBuilder } = require("discord.js");
const Config = require("../config.json");

function getProfileInfoEmbed(data) {
  const embed = new EmbedBuilder()
    .setTitle(`${data.username}'s Profile`)
    .setColor(Config.embedColorPrimary)
    .setThumbnail(data.avatarURL || data.discordClean.avatarURL)
    .setDescription(data.customize?.description || "No description provided.")
    .addFields(
      {
        name: "UID",
        value: `${data.id}`,
        inline: true,
      },
      { name: "Username", value: `${data.username}`, inline: true },
      {
        name: "Views",
        value: `${data.viewsCount}`,
        inline: true,
      },
      {
        name: "Accound Creation",
        value: `<t:${Math.floor(data.createdAt.toDate().getTime() / 1000)}:R>`,
      }
    )
    .setFooter({ text: Config.footerText })
    .setTimestamp();

  return embed;
}

module.exports = { getProfileInfoEmbed };
