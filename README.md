# Byte-Sized Medieval Paleography API

This is the API for the Byte-Sized Medieval Paleography app.

## Endpoints
### Un-Authenticated Routes

POST /api/register

- Response: 201, `{ success: true }`

POST /api/login

- Response: 200, `{ token }`

GET /api/leaderboard

- Response: 200, Array of top ten users by score: `[{ id, username, score}]`

### Authenticated Routes

GET /api/profile

- Response: 200, `{ id, username, score }`

GET /api/text

- Response: 200, `{ id, image_url, transcription, points }`

POST /api/user/text

- Response: 201

PATCH /api/users/username

- Response: 200, `{ message: "Username updated! }`

PATCH /api/users/email

- Response: 200, `{ message: "Email updated! }`

PATCH /api/users/password

- Response: 200, `{ message: "Password updated! }`

PATCH /api/users/score

- Response: 200, `{ newTotal }`

DELETE /api/users/

- Response: 204
