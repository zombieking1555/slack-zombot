require("dotenv").config();
const axios = require("axios");


const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/zsb-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/zsb-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
      `Available Commands:
/dsb-ping - Check bot latency
/dsb-catfact - Get a cat fact
/dsb-joke - Get a random joke
/dsb-help - Show this help message`
  });
});

app.command("/zsb-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/zsb-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
        `${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});


// ...existing code...
app.command("/zsb-holiday", async ({ command, ack, respond }) => {
  await ack();

  const parts = (command.text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const mode = (parts[0] || "").toLowerCase();

  // =========================
  // LIST MODE
  // =========================
  if (mode === "list") {
    try {
    const query = parts.slice(1).join(" ").toLowerCase();

    console.log("LIST MODE TRIGGERED", parts);
      if (
        !global._cal_countries_cache ||
        Date.now() - global._cal_countries_cache.ts > 24 * 60 * 60 * 1000
      ) {
        const resp = await axios.get(
          "https://calendarific.com/api/v2/countries",
          {
            params: { api_key: process.env.CALENDARIFIC_API_KEY }
          }
        );
console.log("RAW COUNTRIES RESPONSE:");
console.log(JSON.stringify(resp.data, null, 2));
        const list =
          resp?.data?.response?.countries || resp?.data?.countries || [];

        global._cal_countries_cache = {
          ts: Date.now(),
          data: list
        };
      }

      let countries = global._cal_countries_cache.data || [];

      // optional search filter
      if (query) {
        countries = countries.filter(c => {
          const name = (c.country_name || "").toLowerCase();
          const code = (c.country_iso || "").toLowerCase();
          return name.includes(query) || code.includes(query);
        });
      }

      const body = countries
        .map(c => {
          const code =
  c.country_iso ||
  c.country_code ||
  c["iso-3166"] ||
  c.iso ||
  c.code ||
  "??";

const name = c.country_name || c.name || "Unknown";
return `${code} - ${name}`;
        })
        .join("\n");

      return respond({
        text:
          `Supported countries (${countries.length}):\n` +
          body
      });

    } catch (err) {
      console.error("Failed to fetch countries:", err);
      return respond({
        text: "Failed to fetch country list."
      });
    }
  }

  // =========================
  // HOLIDAY MODE
  // =========================

  const code = parts[0];

  if (!code || code.toLowerCase() === "list") {
    return respond({
      text: "Usage: `/zsb-holiday <COUNTRY_CODE> [MM/DD]` or `/zsb-holiday list [search]`"
    });
  }

  if (code.length !== 2) {
    return respond({
      text: "Country code must be 2 letters. Example: `/zsb-holiday US`"
    });
  }

  const date = parts[1];

  let month = null;
  let day = null;

  if (date) {
    const match = date.match(/^(\d{1,2})\/(\d{1,2})$/);

    if (!match) {
      return respond({
        text: "Date must be in MM/DD format. Example: `/zsb-holiday US 7/4`"
      });
    }

    month = parseInt(match[1], 10);
    day = parseInt(match[2], 10);

    if (month < 1 || month > 12 || day < 1 || day > 31) {
      return respond({
        text: "Invalid date. Use MM/DD format, e.g. `/zsb-holiday US 7/4`"
      });
    }
  }

  try {
    const year = new Date().getFullYear();
    const country = code.toUpperCase();

    const params = {
      api_key: process.env.CALENDARIFIC_API_KEY,
      country,
      year
    };

    if (month && day) {
      params.month = month;
      params.day = day;
    }

    const response = await axios.get(
      "https://calendarific.com/api/v2/holidays",
      { params }
    );

    const holidays = response.data.response.holidays || [];

    if (!holidays.length) {
      return respond({
        text: `No holidays found for ${country} in ${year}.`
      });
    }

    return respond({
      text: `Holidays in ${country}:\n${holidays
        .map(h => h.name)
        .join("\n")}`
    });

  } catch (err) {
    console.error("Failed to fetch holidays:", err);
    return respond({
      text: "Failed to fetch holidays. Try again later."
    });
  }
});
// ...existing code...



(async () => {
  await app.start();
  console.log("bot is running!");
})();