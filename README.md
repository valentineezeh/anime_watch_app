# valentine-training-project Anime
This is a simple application that allows an authenticated user to perform crud operations on a resource.

API Endpoint: https://valentine-api.outliant.training/api

Frontend Link: https://valentine.outliant.training/

# Technology Used
- Frontend: html, css, react-bootstrap, redux-toolkit, react-redux, react-hook-form
- Backend: Node/Express,
- Database: DynamoDB,
- Libraries: Babel-CLI, Eslint, Cognito, AWS,

# Features
- Users can create an account and login
- Authenticated User should be able to create an anime resource.
- Authenticated user should be able to see all anime created by other users.
- Authenticated user should only be able to update the resource he has created
- Authenticated user should only be able to delete the resource he has created

## API Endpoints

| Endpoint                                      | Functionality
|-----------------------------------------------|-----------------------------|
| POST /api/register                            | Register a user             |
| POST /api/login                               | Login a user                |
| GET /api/animes?searchQuery='naruto'          | Get all anime               |
| GET /api/anime/\<id>                          | Get a anime by id           |
| UPDATE /api/anime/\<id>                       | Update anime by id          |
| Delete /api/anime/\<id>                       | Delete anime by id          |

[Swagger documentation](https://valentine-api.outliant.training/api-docs)

# How to run backend app
- Download or clone
- Open terminal inside the backend directory of clone folder
- Type npm install to install all dependencies.
- Run the app by typing `npm run dev`


# How to run the frontend app
- CD into the frontend directory of the clone folder
- Type `npm i` to install all dependencies
- Run the react app by running `npm start`

## Author
[Valentine Ezeh](https://github.com/outliant/valentine-training-project)

