# Byte-Sized Medieval Paleography API

This is the API for the Byte-Sized Medieval Paleography app. The project also has a [front-end repo](https://github.com/werronense/byte-sized-paleography).

You can play the game by installing both repos locally. Installation instructions are available in the README files of the two repos.

## Installation
1. Clone the repository
2. Run `npm install` to install all dependencies
3. Create a MySQL database on your machine
4. Create a `.env` using `.env.sample` as a model
5. Add your preferred localhost port, local database information, and a secret key for encoding auth tokens to your `.env` file
6. Use `npm run db:migrate` to create the database tables
7. Use `npm run db:seed` to seed the database
8. Use `npm run start` to start the server

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
