const { Client, GatewayIntentBits, Partials } = require("discord.js");

require("colors");
const Config = require("./config.json");

const dotenv = require("dotenv");
dotenv.config();
const { DISCORD_BOT_TOKEN, ALLOWED_ORIGIN } = process.env;

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// --- Discord Bot Setup ---
const {
  Guilds,
  GuildMembers,
  GuildMessages,
  MessageContent,
  GuildVoiceStates,
  GuildPresences
} = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const client = new Client({
  partials: [User, Message, GuildMember, ThreadMember, Channel],
  intents: [
    Guilds,
    GuildMembers,
    GuildMessages,
    MessageContent,
    GuildVoiceStates,
    GuildPresences
  ],
});

const commandHandler = require("./handlers/commandHandler");
const eventHandler = require("./handlers/eventHandler");

commandHandler(client);
eventHandler(client);

client.login(DISCORD_BOT_TOKEN);

// --- /presence Endpoint ---
app.post("/presence", async (req, res) => {
  const { userId } = req.body;

  console.log("Request received for presence");

  if (!client.isReady()) {
    return res.status(503).json({ error: "Discord bot is offline" });
  }

  try {
    const guild = await client.guilds.fetch(Config.serverId);
    const member = await guild.members.fetch(userId);

    const status = member.presence?.status || "offline";
    const activities = member.presence?.activities || [];

    const avatarURL = member.displayAvatarURL({
      size: 512,
      extension: "gif",
      forceStatic: false,
    });

    const decorationURL = member.user.avatarDecorationURL();

    res.status(200).json({
      status,
      activities,
      avatarURL,
      decorationURL,
    });
  } catch (err) {
    console.error("❌ Error fetching presence:", err);
    res.status(404).json({ error: "User not found or not in server" });
  }
});

// --- Start server ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
