const { db } = require("../../firebase");
const { getProfileInfoEmbed } = require("../../utils/getProfileInfoEmbed");

module.exports = {
  name: "me",
  description: "Display informations about your frozi.lol account",
  async execute(message, args, client) {
    const discordId = message.author.id;

    try {
      const profilesRef = db.collection("profiles");
      const querySnap = await profilesRef
        .where("discordID", "==", discordId)
        .limit(1)
        .get();

      if (querySnap.empty) {
        return message.reply("`❌` You don't have a frozi.lol profile linked.");
      }

      const profileDoc = querySnap.docs[0];
      const data = profileDoc.data();

      const embed = getProfileInfoEmbed(data);
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      message.reply("Something went wrong fetching your profile.");
    }
  },
};
