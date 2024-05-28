# Byte-Sized Medieval Paleography API

This is the API for the Byte-Sized Medieval Paleography app.

## Endpoints
### Un-Authenticated Routes

POST /api/register

- Response: 201, `{ success: true }`

POST /api/login

- Response: 200, `{ token }`

### Authenticated Routes

GET /api/profile

- Response: 200, `{ username, score }`

GET /api/text

- Response: 200, `{ id, image_url, transcription, points }`

POST /api/user/:userId/text/:textId

- Response: 201

PUT /api/user/:id

- Response: 200, `{ username, score }`

DELETE /api/user/:id

- Response: 204
