# Slack Zombot

A Slack bot built with Node.js and Slack Bolt that follows HackClubs mission template!

![Demo of the bot's usage](assets/slack-zombot.gif) 

Test it out in the [Hackclub Slack server](https://app.slack.com/client/E09V59WQY1E/C0APH2MMHH7), Using any of the commands below:

## Commands

| Command                    | Description                      |
| -------------------------- | -------------------------------- |
| `/zsb-ping`                | Check bot latency                |
| `/zsb-catfact`             | Get a random cat fact            |
| `/zsb-joke`                | Get a random joke                |
| `/zsb-help`                | Display available commands       |
| `/zsb-holiday US`          | Show holidays for a country      |
| `/zsb-holiday US 7/4`      | Show holidays on a specific date |
| `/zsb-holiday list`        | List supported countries         |
| `/zsb-holiday list united` | Search supported countries       |

## Example Usage

```text
/zsb-ping

Pong!
Latency: 23ms
```

```text
/zsb-catfact

Cat Fact:
Cats can rotate their ears 180 degrees.
```

```text
/zsb-holiday US 7/4

Holidays in US:
International Day of Cooperatives
Independence Day
```
## Running Locally

### Prerequisites

Before running the bot, ensure you have:

* Node.js 18 or later installed
* A Slack app configured with Socket Mode enabled
* A Slack Bot User OAuth Token (`SLACK_BOT_TOKEN`)
* A Slack App-Level Token (`SLACK_APP_TOKEN`)
* A Calendarific API key (`CALENDARIFIC_API_KEY`)

### Clone the Repository

```bash
git clone https://github.com/zombieking1555/slack-zombot.git
cd slack-zombot
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root:

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
CALENDARIFIC_API_KEY=your-calendarific-api-key
```

### Start the Bot

Run:

```bash
node index.js
```

Alternatively, use the below shortcut script:

```bash
npm start
```

### Verify the Bot is Running

If startup is successful, the console should display:

```text
bot is running!
```

Open Slack and test one of the registered commands:

```text
/zsb-ping
```

Expected response:

```text
Pong!
Latency: <number>ms
```

Now the bot is running locally!

## Acknowledgements

Acknowledging the Hackclub Stardance team in the creation of the Slack Bot mission instructions, which were heavily leaned on to create this project.

## License

MIT License
