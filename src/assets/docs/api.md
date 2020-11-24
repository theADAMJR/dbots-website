<title>API</title>
<description>Interact with DBots through HTTP requests.</description>
<url>api</url>

# API
- Interact with DBots through HTTP requests

## Uses
- Bot interaction for webapp
- XP Cards
- Creating payment sessions
- OAuth2 Discord authorization

## Status Codes
Code | Description
-----|-------------
200  | OK.
201  | Created.
400  | Bad request.
401  | Unauthorized.
404  | Not found.
429  | Too many requests - You are being rate limited.
500  | Internal server error.

**API Error Examples**:
`{ code: 400, message: 'Bad Request' }`

---

## Headers
The API key is used for dealing with bot stats.

### API Key
```json
{
  "Authorization": "<api_key>"
}
```

### User Key
The user key is provided by Discord, and is used for storing user sessions and logging in the Discord user.

```json
{
  "Authorization": "<user_token>"
}
```

---

## Default API Response

```ts
{
  message: string,
  code: number
}
```

---

## Rate Limiting
DBots uses rate limiting to reduce API abuse.

A maximum of *600 requests* can be sent *per 10 minutes*.

---

## Vote Webhook
This is what is posted to a bots **Vote Webhook URL**, when a bot is voted for.

### Reponse

**Schema**:
```ts
{
  at: Date; // JSON date when of vote
  by: string; // id of user that votes
}
```

**Example**:
{
  at: "2020-08-07T12:56:27.100Z",
  by: "218459216145285121"
}

---

## Bot 

## Bot Stats
You can view the stats of a bot, including voting, guilds and more.

**URL**: `https://dbots.co/api/v1/bots/:id/stats`

### Reponse

**Schema**:
```ts
{
  general: { // general bot stats
    approvedAt: Date,
    guildCount: number,
    lastVoteAt: Date,
    totalVotes: number,
    voteCount: number
  },
  topVoters: { // users ranked by votes
    userId: string;
    count: number;
  },
  recentVotes: { // votes per day, during last 7 days
    count: number;
    day: number;
  },
  votes: {
    at: Date;
    by: string;
  }
}
```

**Example**: `https://dbots.co/api/v1/bots/525935335918665760/stats`