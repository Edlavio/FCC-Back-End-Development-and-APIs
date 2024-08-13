![url-shortener-microservice](https://socialify.git.ci/Edlavio/FCC-Back-End-Development-and-APIs/image?font=Inter&forks=1&issues=1&language=1&name=1&owner=1&pattern=Circuit%20Board&stargazers=1&theme=Auto)

A exercise tracker made during **FreeCodeCamp** [Back End Development and APIs course](https://www.freecodecamp.org/learn/back-end-development-and-apis).

![Test sucess image](./public/sucess.png)


## Test Scenario:
- [x] You can **POST** to **/api/users** with form data **username** to create a new user.
- [x] The returned response from **POST** **/api/users** with form data username will be an object with **username** and **_id** properties.
- [x] You can make a **GET** request to **/api/users** to get a list of all users.
- [x] The **GET** request to **/api/users** returns an array.
- [x] Each element in the array returned from **GET** **/api/users** is an object literal containing a user's **username** and **_id**.
- [x] You can **POST** to **/api/users/:_id/exercises** with form data **description**, **duration**, and optionally **date**. If no date is supplied, the current date will be used.
- [x] The response returned from **POST** **/api/users/:_id/exercises** will be the user object with the exercise fields added.
- [x] You can make a **GET** request to **/api/users/:_id/logs** to retrieve a full exercise log of any user.
- [x] A request to a user's log **GET** **/api/users/:_id/logs** returns a user object with a **count property** representing the number of exercises that belong to that user.
- [x] A **GET** request to **/api/users/:_id/logs** will return the user object with a log array of all the exercises added.
- [x] Each item in the log array that is returned from **GET** **/api/users/:_id/logs** is an object that should have a **description**, **duration**, and **date** properties.
- [x] The **description** property of any object in the **log** array that is returned from **GET** **/api/users/:_id/logs** should be a string.
- [x] The duration property of any object in the log array that is returned from **GET** **/api/users/:_id/logs** should be a number.
- [x] The **date** property of any object in the **log** array that is returned from **GET** **/api/users/:_id/logs** should be a string. Use the **dateString** format of the **Date** API.
- [] You can add **from**, **to** and **limit** parameters to a GET **/api/users/:_id/logs** request to retrieve part of the log of any user. **from** and **to** are dates in **yyyy-mm-dd** format. **limit** is an integer of how many logs to send back.

## Helpful resources

- [Express.js](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)


## How test

You have examples of request in index.http you could use REST Client ou another tool.

#### Shorten url request:

```js
POST
https://url-shortener-uzv4.onrender.com/api/shorturl
Content-Type: application/x-www-form-urlencoded

// A url form encoded
url=https://edlavio.eu.org
```

#### Getting shortened url:

```js
GET

// After shorturl/put_here_short_url
https://url-shortener-uzv4.onrender.com/api/shorturl/534447

// Open in Browser and will redirect to https://github.com/Edlavio
```

## How setup

You will need [pnpm](https://pnpm.io/) and Node.js and some API test tool (Postman, Imsomnia, Thunder Client, Httpie or REST Client).

You will need also setup a **Mongo Database** and create a **.env** file you have **.env.sample** as example.

```bash
# To install the dependencies
pnpm i
```

```bash
# To run de project
pnpm dev
```
