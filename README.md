# Discord Meme Bot

[![GitHub](https://img.shields.io/github/license/drasmodeus666/Discord-js-meme-bot)](https://github.com/drasmodeus666/Discord-js-meme-bot/blob/main/LICENSE)

This Discord bot fetches and displays memes from Reddit using the [meme-api.com](https://meme-api.com/) API. It's built with Discord.js v14+ and is designed to be easy to set up and use.

**Developed by [drasmodeus666](https://github.com/drasmodeus666)**.  This attribution must remain in all distributions and modifications of this code.

## Features

*   `/meme`: Get a random meme from Reddit.
*   `/sr <subreddit>`: Get a meme from a specific subreddit (e.g., `/sr pics`, `/sr dankmemes`).
*   `/help`: Displays a list of available commands and information about the bot.
*   Duplicate Meme Prevention: The bot avoids sending the same meme multiple times within a 24-hour period.
*   Error Handling:  Provides informative error messages if a subreddit is not found or if there's a problem fetching a meme.

## Prerequisites

*   **Node.js (v16.9.0 or higher):** Download and install from [https://nodejs.org/](https://nodejs.org/).  Node.js v18+ is recommended.
*   **npm (or yarn):**  npm is usually installed with Node.js.  You can also use yarn if preferred.
*   **Git:** Download and install from [https://git-scm.com/](https://git-scm.com/).
*   **A Discord Bot Token:** Obtained from the Discord Developer Portal (instructions below).
*   **A Discord Client ID:** Also obtained from the Discord Developer Portal.

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/drasmodeus666/Discord-js-meme-bot.git
cd Discord-js-meme-bot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Discord Application and Bot

1.  Go to the Discord Developer Portal: [https://discord.com/developers/applications](https://discord.com/developers/applications)
2.  Click "New Application".
3.  Give your application a name (e.g., "MyMemeBot").
4.  Click "Create".
5.  Go to the "Bot" section (left sidebar).
6.  Click "Add Bot".
7.  Confirm by clicking "Yes, do it!".
8.  **Important:** Under "Privileged Gateway Intents", enable:
    *   `Message Content Intent`
9.  Click "Save Changes".

### 4. Get Your Bot Token

1.  On the "Bot" page, under "Token", click "Reset Token" (if needed) and then "Copy".  **Keep this token extremely secure. Do not share it or commit it to version control.**

### 5. Get Your Client ID

1.  Go to the "General Information" section.
2.  Copy the "Application ID". This is your Client ID.

### 6. Create a `.env` File

1.  In the root directory of your project (where `index.js` is), create a file named `.env`.
2.  Add the following lines, replacing the placeholders with your *actual* token and client ID:

    ```
    DISCORD_BOT_TOKEN=your_actual_bot_token_here
    CLIENT_ID=your_bot_client_id_here
    # Optional: Add GUILD_ID if using guild commands for testing:
    # GUILD_ID=your_guild_id_here
    ```

    **Example:**
     ```
    DISCORD_BOT_TOKEN=MTA4NjUwMjE1NjYzNzU4Njk4.Gf7_example.v94hVyour-real-token_goes_here
    CLIENT_ID=108650215663758698
    ```

3. **Crucially important:** Add `.env` to your `.gitignore` file to prevent it from being committed to your repository. This is essential for security.

### 7. Invite the Bot to Your Server

1.  Go to "OAuth2" -> "URL Generator".
2.  Under "Scopes", select `bot` and `applications.commands`.
3.  Under "Bot Permissions", select:
    *   `Read Messages/View Channels`
    *   `Send Messages`
    *   `Embed Links`
4.  Copy the generated URL.
5.  Open the URL in your browser.
6.  Select your server and click "Authorize".

### 8. Run the Bot

```bash
node index.js
```

The bot should now be online in your Discord server!

## Usage

*   `/meme`:  Fetches a random meme.
*   `/sr <subreddit>`: Fetches a meme from the specified subreddit (e.g., `/sr aww`).  Replace `<subreddit>` with the subreddit name (without the `r/`).
*   `/help`: Shows command information.

## Troubleshooting

*   **"This interaction failed" error:**
    *   Ensure your bot has the necessary permissions.
    *   Verify that your bot token and client ID are correct.
    *   Make sure you enabled the `Message Content Intent`.
*   **Bot is not responding:**
    *   Check your terminal for error messages.
    *   Confirm your bot is online in the Discord Developer Portal.
    *   Double-check your `.env` file.
    *   Verify that dependencies are installed (`npm install`).
*   **"Subreddit 'r/...' not found":** The subreddit doesn't exist or is private. Check the name.
*   **Commands not updating/registering:**
    *   Ensure your `CLIENT_ID` is correct in `.env`.
    *   If you changed scopes, re-invite the bot.
    *   For faster testing, use guild commands (see comments in `index.js`).  Remember to add `GUILD_ID` to your `.env` file if you do this.  Switch back to global commands before deploying.
    * Discord can take time to propagate command changes, sometimes up to an hour.

## Contributing

Contributions are welcome!  Please fork the repository and submit a pull request with your changes.  Remember to keep the attribution to **drasmodeus666** intact.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. (You'll need to create a LICENSE file and paste in the MIT License text.)

**Developed by [drasmodeus666](https://github.com/drasmodeus666)**.
```

