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

### Rate Limiting
DBots uses rate limiting to reduce API abuse.

---

## Webhooks

---

### On Vote
This webhook is sent when a user votes.