# Lambda Notes Server

This is a RESTful API to connect the Lambda Notes Project by William Pelton.

## API Endpoints

| Type   | Path            | Data                   |
| ------ | --------------- | ---------------------- |
| GET    | /users/logout   | N/A                    |
| POST   | /users/login    | username, password     |
| POST   | /users/register | username, password     |
| GET    | /posts/         | session cookie         |
| POST   | /posts/         | title, body            |
| PUT    | /posts/:id      | post.\_id, title, body |
| DELETE | /posts/:d       | post.\_id              |

## Route Details

### Log-In

- [POST] request to `users/login` requires a username and a password.
  - Response will consist of `{ session cookie, username, posts }`

### Register New User

- [POST] request to `users/register` requires a username and a password.
  - Response will consist of `{ session cookie, username, posts }`

### Log-Out

- [GET] request to `users/logout` requires no data. Will log out the current user and destroy the active session.

### Note Manipulation

1.  [GET] request to `posts` requires active session from current active user to be present on `Auth` cookie.

    - Will return user object with `{ _id, username, posts }`

2.  [POST] request to `posts` requires a title and active session. `{ session, title, body }`

    - Saves post to the database, and returns the newly saved post document.

3.  [PUT] request to `posts/:id` requires active session and `post._id`. `title` and `body` are optional.

    - Updates the post on the database and returns the updated post document.

4.  [DELETE] request to `posts/:id` requires active session on the body, and the `:id` param must be an active post.\_id.

    - Deletes the post from the database, and returns the quantity of deleted documents.

[trello](https://trello.com/b/x6M4nx60/lambda-postsbackend-william-pelton)
[front-end](https://romantic-mirzakhani-d12553.netlify.com/)
[back-end](https://quiet-fjord-20542.herokuapp.com/)
