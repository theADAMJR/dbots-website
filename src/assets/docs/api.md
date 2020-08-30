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
400  | Key is invalid, or an error occurred with the request
404  | Route could not be found
429  | Too many requests
500  | Internal server error (rare)

**API Error Examples**:
`{ code: 400, message: 'Bad Request' }`

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