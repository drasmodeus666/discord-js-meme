const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  EmbedBuilder,
  REST,
  Routes,
} = require("discord.js");
const axios = require("axios");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const githubUsername = "drasmodeus666";
const githubProfileURL = `https://github.com/${githubUsername}`;

const sentMemes = new Set();

async function fetchMeme(subreddit = null) {
  try {
    let apiUrl = "https://meme-api.com/gimme";
    if (subreddit) {
      apiUrl += `/${subreddit}`;
    }

    const response = await axios.get(apiUrl);
    const memeData = response.data;

    if (!sentMemes.has(memeData.url)) {
      sentMemes.add(memeData.url);
      return memeData;
    } else {
      return fetchMeme(subreddit); // Recursive call for faster retries
    }
  } catch (error) {
    console.error("Error fetching meme:", error);
    if (error.response && error.response.status === 404 && subreddit) {
      return { error: `Subreddit 'r/${subreddit}' not found.` };
    }
    return null;
  }
}

setInterval(
  () => {
    sentMemes.clear();
    console.log("sentMemes set cleared.");
  },
  24 * 60 * 60 * 1000,
);

const commands = [
  new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Get a random meme from Reddit!"),
  new SlashCommandBuilder()
    .setName("sr")
    .setDescription("Get a meme from a specific subreddit.")
    .addStringOption((option) =>
      option
        .setName("subreddit")
        .setDescription("The subreddit to fetch from.")
        .setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show available commands and information."),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN,
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

(async () => {
  try {
    console.log("Started refreshing application (/) commands for guild.");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID,
      ),
      { body: commands },
    );
    console.log("Successfully reloaded application (/) commands for guild.");
  } catch (error) {
    console.error(error);
  }
})();

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "meme") {
    await interaction.deferReply();
    const memeData = await fetchMeme();

    if (memeData) {
      const embed = new EmbedBuilder()
        .setTitle(memeData.title)
        .setURL(memeData.postLink)
        .setImage(memeData.url)
        .setColor(0x00ae86)
        .setTimestamp()
        .setFooter({
          text: `Bot by ${githubUsername}`,
          iconURL: "https://github.githubassets.com/favicons/favicon.svg",
        })
        .addFields({
          name: "Developer",
          value: `[${githubUsername}](${githubProfileURL})`,
          inline: true,
        });

      await interaction.editReply({ embeds: [embed] });
    } else {
      await interaction.editReply("Failed to fetch a meme. Try again later!");
    }
  } else if (interaction.commandName === "sr") {
    await interaction.deferReply();
    const subreddit = interaction.options.getString("subreddit");
    const memeData = await fetchMeme(subreddit);

    if (memeData) {
      if (memeData.error) {
        await interaction.editReply(memeData.error);
        return;
      }
      const embed = new EmbedBuilder()
        .setTitle(memeData.title)
        .setURL(memeData.postLink)
        .setImage(memeData.url)
        .setColor(0x00ae86)
        .setTimestamp()
        .setFooter({
          text: `Bot by ${githubUsername}`,
          iconURL: "https://github.githubassets.com/favicons/favicon.svg",
        })
        .addFields({
          name: "Developer",
          value: `[${githubUsername}](${githubProfileURL})`,
          inline: true,
        });
      await interaction.editReply({ embeds: [embed] });
    } else {
      await interaction.editReply("Failed to fetch a meme. Try again later!");
    }
  } else if (interaction.commandName === "help") {
    const helpEmbed = new EmbedBuilder()
      .setTitle("Bot Commands")
      .setDescription("Here are the available commands:")
      .setColor(0x3498db)
      .addFields(
        { name: "/meme", value: "Get a random meme." },
        {
          name: "/sr <subreddit>",
          value: "Get a meme from a specific subreddit.",
        },
        { name: "/help", value: "Show this help message." },
        {
          name: "Developer",
          value: `[${githubUsername}](${githubProfileURL})`,
        },
      )
      .setFooter({
        text: `Bot by ${githubUsername}`,
        iconURL: "https://github.githubassets.com/favicons/favicon.svg",
      });

    await interaction.reply({ embeds: [helpEmbed] });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
