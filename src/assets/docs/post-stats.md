<title>Post Stats</title>
<description>A guide to show how to post stats to the DBots API, in lots of popular programming languages.</description>
<url>post-stats</url>

# Post Stats
Here are examples of posting bot stats to the DBots API.

---

## Finding Your Bot API Token

Go to **Dashboard** -> **Your Bot** -> **API**
or go to: `https://dbots.co/dashboard/bots/[yourBotId]/api`
and replace `yourBotId` with your 18 character Discord Bot ID. 

---

## Bot Stats

Property  | Type
:---------|:------------
guildCount | Number

---

### JavaScript
`Browser`

```
const botId = '301520172194201602'; // your bot Snowflake ID
const botAPIToken = 'b344b2d1-8fd0-4ef7-b7d8-1567d4e337c7'; // your bot API token

fetch(`https://dbots.co/api/v1/bots/${botId}/stats`, {
  body: JSON.stringify({ guildCount: bot.guilds.cache.size }),
  headers: {
    'Authorization': botAPIToken,
    'Content-Type': 'application/json'
  },
  method: 'POST',
});
```

---

### NodeJS

```
const fetch = require('node-fetch');
```

See [JavaScript Implementation](docs/post-stats/#javascript) above.

---

*If you have any more examples to contribute, please join the [Discord Server](/server) to send them.*