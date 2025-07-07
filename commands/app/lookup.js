const { db } = require("../../firebase");
const { getProfileInfoEmbed } = require("../../utils/getProfileInfoEmbed");

module.exports = {
  name: "lookup",
  description: "Display informations about someone else's frozi.lol account",
  async execute(message, args, client) {
    const username = args[0];

    if (!username) {
      return message.reply("`❌` Please provide a profile username.");
    }

    try {
      const profilesRef = db.collection("profiles");
      const querySnap = await profilesRef
        .where("username", "==", username)
        .limit(1)
        .get();

      if (querySnap.empty) {
        return message.reply("`❌` No profile found with that username.");
      }

      const profileDoc = querySnap.docs[0];
      const data = profileDoc.data();

      const embed = getProfileInfoEmbed(data);
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      message.reply("Something went wrong fetching profile.");
    }
  },
};
