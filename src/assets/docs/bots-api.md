<title>Bot API</title>
<description>Interact with DBots Bots through HTTP requests.</description>
<url>bot-api</url>

# Bot API

### Bot
```ts
_id: string;
approvedAt: Date;
badges: string[];
createdAt: Date;
feedback: Feedback[];
listing: Listing;
ownerId: string;
stats: { guildCount: number },
totalVotes: number;
lastVoteAt: Date;
votes: Vote[];
```

### Listing
```ts
body: string;
botId: string;
invite: string;
githubURL: string;
overview: string;
ownerId: string;
prefix: string;
supportInvite: string; 
tags: string[];
websiteURL: string;
```

