<title>Changelog</title>
<description>Updates to DBots and the DBots API.</description>
<url>changelog</url>

# Changelog

---

## Beta

---

## v0.2.0b

![v0.2.0b](assets/docs/img/v0.2.0b.png)

**Add**:
- lots of reviewer and admin commands
- bot reviewal commands, instead of using dashboard to review bots
- `/bots/new` -> user owner must be in the DBots server to create bot listings
- `/bots/new` -> bots are now kicked if they are denied

**Change/Fix**:
- `*` -> key is nearly always shown in headers, instead of explicitly in URL
- `/search` -> searching now works correctly
- `/api/user` -> combined with `/api/user/saved` for faster loading
- `/bots/new` -> more helpful form validation

**Remove**:
- `/` -> ghost bot cards no longer from unapproved bots

---

### v0.1.2b
`16/09/2020`

![v0.1.2b](assets/docs/img/v0.1.2b.png)

**Add**:
- `/dashboard` -> recent feedback
- `/user/:id` -> user profiles

**Change/Fix**:
- `/bots/add` -> max tags is now `8`, and was previously `5` tags
- `/bots/add` -> draft no longer updates, while editing listing
- `/bots/add` -> `listing.overview` minimum length is now `32` characters
- `/bots/:id` -> `N/A` server count no longer shows
- `/` -> featured bots now shuffle to give them equal impressions 

**Remove**:

---

### v0.1.1b
`07/08/2020`

![v0.1.1b](assets/docs/img/v0.1.1b.png)

**Add**:
- bot vote webhook -> get vote info when a user votes for your bot
- vote notifications -> get notified when you can next vote for a bot
- bot stats -> updated every 30 mins

**Change/Fix**:
- bot voting -> total votes -> now add when a user votes

**Remove**:
- bot voting -> notification reminders (may be temporary)

---

### v0.1.0b

![v0.1.0b](assets/docs/img/v0.1.0b.png)

**Add**:
- bot page -> smooth table styling
- bot widgets -> small, and medium widget sizes

**Change/Fix**:
- docs -> updated bot guidelines
- bot page -> minimum bot page overview is 32 characters

**Remove**:
- add bot -> bot client id

---

## Alpha

---

### v0.0.5a

![v0.0.5a](assets/docs/img/v0.0.5a.png)

**Add**:
- dashboard -> themes
- dashboard -> discord style layout

**Change/Fix**:
- bot owners now cannot add themselves as a bot

**Remove**
- client id from bot add form

---

### v0.0.4a

![v0.0.4a](assets/docs/img/v0.0.4a.png)

**Add**:
- first large image widget

**Change/Fix**:
- featured bots are now at the top
- bot vote page now shows bot card

**Remove**:
- old JavaScript bot widgets

---

### v0.0.3a

![v0.0.3a](assets/docs/img/v0.0.3a.png)

**Add**:
- badges -> featured badge
- docs -> more documentation on post stats

**Change/Fix**:
- bot page -> better styling

**Remove**:
- home page -> moderation bots
- dbots bot -> messaged when user left dbots server

---

### v0.0.2a

`24/06/2020`

![v0.0.2a](assets/docs/img/v0.0.2a.png)

**Add**:
- cookie banner
- api -> post stats

**Change/Fix**:
- bot status -> was not displaying correct presence
- widgets -> were not actually working
- add bot -> body field height was too tall (on mobile)
- better bot card alignment
- better mobile styling support
- new bots -> now shows bots
- dashboard -> users are redirected if they go to a bot page they cannot manage  

**Remove**:
- new bot -> multiple owners

---

### v0.0.1a

`20/06/2020`
![v0.0.1a](assets/docs/img/v0.0.1a.png)

[DBots](/) and the DBots Discord Server was released!
The first version was made in around 3 days.