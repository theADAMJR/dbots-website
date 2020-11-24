<title>Packs API</title>
<description>Interact with DBots Bot Packs through HTTP requests.</description>
<url>packs-api</url>

# Packs API

### Bot Pack
```ts
_id: string;
bots: BotDocument[];
createdAt: Date;
description: string;
owner: UserDocument;
updatedAt: Date;
votes: number;
```

### Unpopulated Bot Pack
```ts
_id: string;
bots: BotDocument[];
createdAt: Date;
description: string;
owner: UserDocument;
updatedAt: Date;
votes: number;
```

## GET `/packs`
Gets all bot packs.

### Status: `200`, `400`
### Returns: [UnpopulatedBotPack](/docs/packs-api#unpopulated-bot-pack)[]

---

## GET `/packs/:id`
Gets specific bot pack, by ID.

### Status: `200`, `400`
### Returns: [BotPack](/docs/packs-api#bot-pack)

---

## POST `/packs`
Create a new pack. Must be logged in.

### Headers
```json
{
  "Authorization": "<user_token>" 
}
```

### Codes: `200`, `400`, `401`
### Returns: [BotPack](/docs/packs-api#bot-pack)

---

## PATCH `/packs/:id`
Edit a bot pack. Must be logged in.

### Headers
```json
{
  "Authorization": "<user_token>" 
}
```

### Codes: `200`, `400`, `401`, `404`
### Returns: [BotPack](/docs/packs-api#bot-pack)

---

## DELETE `/packs/:id`
Delete a bot pack. Must be logged in.

### Headers
```json
{
  "Authorization": "<user_token>" 
}
```

### Codes: `200`, `400`, `401`, `404`
### Returns: [DefaultAPIResponse](/docs/api#default-api-response)

---

## GET `/packs/:id/vote`
Vote for a bot pack. Must be logged in.

### Headers
```json
{
  "Authorization": "<user_token>" 
}
```

### Codes: `200`, `400`, `401`, `404`
### Returns: [DefaultAPIResponse](/docs/api#default-api-response)
