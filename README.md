# Blogging API is a project submitted for 3MTT Backend Engineering – Intermediate Module Assessment.

## Built with

- Javascript
- Node.Js
- MONGODB
- Express.Js

## Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Requirements

- User should be able to resgister, login.
- Authenticated users should be able to generate token and create posts.
- Using JWT as authentication strategy, token generated should expire after 1 hour.
- Blogs created should be in two state; **draft and published**.
- The owner of blog should be able to edit,delete, change the state of the blog.
- unauthenticated users should be able to read published blogs
- Test application

## Setup

- Install Nodejs,mongodb
- Pull this repo
- run `npm install`
- create .env file
- create a Cluster/Database on MongoDB Atlas
- update .env with the MongoDB Database URI and JWT_SECRET (Just a random string)
- run `npm run dev`

## Base URL

# On local host :

http://localhost:4000/ (In this case my PORT was set to 4000 in the .env file)

# Hosted on render:

https://altblogging.onrender.com/blogs

<!-- [BlogAPI](/blogs) -->

## Models

## Users

### User register details

|   field   | data_type |      constraints      |
| :-------: | :-------: | :-------------------: |
|   email   |  String   | required, unique=true |
| password  |  String   |       required        |
| firstname |  String   |       required        |
| lastname  |  String   |       required        |

### User login details

|  field   | data_type |
| :------: | :-------: |
|  email   |  String   |
| password |  String   |

## Article model

|    field     | data_type |      constraints      |
| :----------: | :-------: | :-------------------: |
|    title     |  String   | required, unique=true |
| description  |  String   |       optional        |
|    author    | ObjectId  |       optional        |
|    state     |  String   |     default, enum     |
|  read_count  |  Number   |        default        |
| reading_time |  String   |       optional        |
|     body     |  String   | required, unique=true |
|  timestamp   |  String   |       optional        |

# Endpoints

### Signup

- **Route**: /register
- **Method**: POST
- Body:

```
{
  "email": "ogunladestephen20@gmail.com",
  "password": "123456789",
  "firstname": "Stephen",
  "lastname": "Ogunlade"
}

```

- **Response**

```
{
    "message": "Signup successful",
    "user": {
        "firstname": "Stephen",
        "lastname": "Ogunlade",
        "password": "$2b$10$FN3Xff.OcrRH3.mj6IH9he4Mk64Vg61XK5n.UxlfHMN1teJ8VWpra",
        "email": "ogunladestephen20@gmail.com",
        "article": [],
        "_id": "6640afe14ea0250151363b4c",
        "__v": 0
    }
}
```

### Login

- **Route**: /login
- **Method**: POST
- **Body**:

```
{
  "email": "ogunladestephen20@gmail.com",
  "password": "123456789"
}
```

- **Response**

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2NDBhZmUxNGVhMDI1MDE1MTM2M2I0YyIsImVtYWlsIjoib2d1bmxhZGVzdGVwaGVuMjBAZ21haWwuY29tIn0sImlhdCI6MTcxNTUxNTU0NSwiZXhwIjoxNzE1NTE5MTQ1fQ.FQHyNU7aGfo5dE03r_WQI23q9H4O-btnp9amSggnYEA"
}
```

# Test all endpoints

### Create article by auntenticated Users

- **Route**: /blog
- **Method**: POST
- **Header**: Authorization: Bearer {token}
- **Body**:

```
{
    "title": "Introduction to Cybersecurity 1",
    "description": "Blog description",
    "tag": "Cybersecurity",
    "body": "blog content"
}
```

- **Response**

```
{
    "status": true,
    "data": {
        "title": "Introduction to Cybersecurity 1",
        "description": "Blog description",
        "body": "blog content",
        "author": "6640afe14ea0250151363b4c",
        "state": "draft",
        "read_count": 0,
        "reading_time": 1,
        "_id": "6640b1554ea0250151363b50",
        "createdAt": "2024-05-12T12:08:53.711Z",
        "updatedAt": "2024-05-12T12:08:53.711Z",
        "__v": 0
    }
}
```

### Update the state from **draft** to **Published**

- **Route**: /blog/:id
- **Method**: PATCH
- **Header**: Authorization: Bearer {token}
- **Body**:

```
{
       "state": "published"
}
```

- **Responses**

```
{
    "status": true,
    "message": "Article updated successfully",
    "article": {
        "_id": "6640b1554ea0250151363b50",
        "title": "Introduction to Cybersecurity 1",
        "description": "Blog description",
        "body": "blog content",
        "author": "6640afe14ea0250151363b4c",
        "state": "published",
        "read_count": 0,
        "reading_time": 1,
        "createdAt": "2024-05-12T12:08:53.711Z",
        "updatedAt": "2024-05-12T12:11:41.936Z",
        "__v": 0
    }
}
```

### Get **published** article by authenticated user

- **Route**: /blog/:id
- **Method**: GET
- **Header**: Authorization: Bearer {token}
- Resposes:

```
{
    "status": true,
    "data": {
        "_id": "6640b1554ea0250151363b50",
        "title": "Introduction to Cybersecurity 1",
        "description": "Blog description",
        "body": "blog content",
        "author": {
            "_id": "6640afe14ea0250151363b4c",
            "firstname": "Stephen"
        },
        "state": "published",
        "read_count": 1,
        "reading_time": 1,
        "createdAt": "2024-05-12T12:08:53.711Z",
        "updatedAt": "2024-05-12T12:13:33.463Z",
        "__v": 0
    }
}
```

### Get **draft** article by authenticated user

- **Route**: /blog/:id
- **Method**: GET
- **Header**: Authorization: Bearer {token}
- **Responses**:

```
{
    "status": true,
    "data": {
        "_id": "6640b2e04ea0250151363b57",
        "title": "Introduction to Cybersecurity 2",
        "description": "Second cybersecurity blog post",
        "body": "Second cybersecurity blog pos content",
        "author": {
            "_id": "6640afe14ea0250151363b4c",
            "firstname": "Stephen"
        },
        "state": "draft",
        "read_count": 1,
        "reading_time": 1,
        "createdAt": "2024-05-12T12:15:28.227Z",
        "updatedAt": "2024-05-12T12:25:31.138Z",
        "__v": 0
    }
}
```

### Delete article by owner

- **Route**: /blog/:id
- **Method**: DELETE
- **Header**:Authorization: Bearer {token}
- **Responses**:

```
{
    "status": true,
    "article": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
```

### Get **published** articles by unauthenticated users

- **Route**: /blogs
- **Method**: GET
- **Response:**

```
{
    "success": true,
    "message": "Published Articles found!",
    "article": [
        {
            "_id": "6640b1554ea0250151363b50",
            "title": "Introduction to Cybersecurity 1",
            "description": "Blog description",
            "body": "blog content",
            "author": "6640afe14ea0250151363b4c",
            "state": "published",
            "read_count": 1,
            "reading_time": 1,
            "createdAt": "2024-05-12T12:08:53.711Z",
            "updatedAt": "2024-05-12T12:13:33.463Z",
            "__v": 0
        },
        {
            "_id": "6640b5dee7a9bc47a0979e82",
            "title": "Introduction to Cybersecurity 3",
            "description": "Second cybersecurity blog post",
            "body": "Second cybersecurity blog pos content",
            "author": "6640afe14ea0250151363b4c",
            "state": "published",
            "read_count": 0,
            "reading_time": 1,
            "createdAt": "2024-05-12T12:28:14.315Z",
            "updatedAt": "2024-05-12T12:30:59.719Z",
            "__v": 0
        }
    ]
}
```
