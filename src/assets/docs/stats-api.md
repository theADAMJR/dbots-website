<title>Stats API</title>
<description>Interact with DBots Bot stats through HTTP requests.</description>
<url>stats-api</url>

# Stats API

## Bot Stats
```ts
{
  general: {
    approvedAt: Date,
    guildCount: number,
    lastVoteAt: Date,
    totalVotes: number,
    voteCount: number,
  },
  recentVotes: [{ count: number, day: string }],
  topVoters: [{ userId: string, count: number }],
  votes: string[]
}
```

## Bot Log
```ts
{
  _id: string;
  changes: {
    at: Date,
    by: string,
    changes: { old: {}, new: {} }
  }
}
```

## GET `/bots/:id/stats`
Gets bot stats, if the bot exists.

### Status: `200`, `400`, `404`
### Returns: [BotStats](/docs/stats-api#bot-stats)

---

## POST `/bots/:id/stats`
Submit bot stats, specific bot pack, by ID. Check out [Post Stats](/docs/post-stats) for more info.

### Body
```ts
{
  guildCount: number
}
```

### Headers: [API Key](/docs/api#api-key)
### Status: `200`, `400`, `401`, `404`
### Returns: `{ guildCount: number }`

---

## GET `/bots/:id/log`
Get bot log, by bot ID. Only a bot manager can use this.

### Headers: [User Key](/docs/api#user-key)
### Status: `200`, `400`, `401`, `404`
### Returns: [Bot Log](/docs/stats-api#bot-log)

---

## GET `/bots/:id/key`
Get API key, by bot ID. Only a bot manager can use this.

### Headers: [User Key](/docs/api#user-key)
### Status: `200`, `400`, `404`
### Returns: `string`

---

## GET `/bots/:id/key/regen`
Regenerate an API key, by bot ID. Sends back new API key. Only a bot manager can use this.

### Headers: [User Key](/docs/api#user-key)
### Status: `200`, `400`, `401`, `404`
### Returns: `string`
