const { db } = require("../../firebase");
const { getProfileInfoEmbed } = require("../../utils/getProfileInfoEmbed");

module.exports = {
  name: "uidlookup",
  description:
    "Display informations about someone else's frozi.lol account based on their UID",
  async execute(message, args, client) {
    const uid = args[0];

    if (!uid) {
      return message.reply("`❌` Please provide a profile UID.");
    }

    try {
      const profilesRef = db.collection("profiles");
      const querySnap = await profilesRef
        .where("id", "==", Number(uid))
        .limit(1)
        .get();

      if (querySnap.empty) {
        return message.reply("`❌` No profile found with that UID.");
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
