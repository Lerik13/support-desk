# Support Desk Application
Client-Server app for tracking tickets, using stack of technologies MERN: MongoDB + ExpressJS + React + NodeJS
```
test user: john@gmail.com, password: 123
```
State-management: Redux/toolkit

Design: mobile-first

MongoDB models:<br>
![DB Schema](https://github.com/Lerik13/support-desk/blob/master/schemaDB.jpg?raw=true "DB Schema")

### Client Functionality

![Main](https://github.com/Lerik13/support-desk/blob/master/screenshots/1.jpg?raw=true "MainPage")

1. Register User
2. Login/Logout (saving JWT-token in user's Local Storage)
```
test user: john@gmail.com, password: 123
```
![Login](https://github.com/Lerik13/support-desk/blob/master/screenshots/2.jpg?raw=true "Login")

3. Create new Ticket for authorized user

![Create](https://github.com/Lerik13/support-desk/blob/master/screenshots/5.jpg?raw=true "CraeteNewTicket")

4. See all user's tickets

![SeeUsersTickets](https://github.com/Lerik13/support-desk/blob/master/screenshots/3.jpg?raw=true "SeeUsersTickets")

5. Edit description of user's ticket if the ticket is not-clossed

![EditTicket](https://github.com/Lerik13/support-desk/blob/master/screenshots/4.jpg?raw=true "EditTicket")

6. Change status for ticket: (ticket created with status='new'; if status is closed, user cannot edit the ticket; user has possibility to reopen the ticket, status will be open)
7. Add/Edit/Remove Note for user's ticket if the ticket is not-clossed and this note is not from Admin

### Developing details
#### Backend libs:
- express -- Express-framework for creating web-apps using NodeJS
- dotenv -- for environment variables
- colors -- use colors for console-log
- jsonwebtoken -- generate web-token for autontification in client-side
- nodemon (dependency) -- constantly watch server.js, so we don't need to restart server
- express-async-handler (dependency) -- for use async-await -- handling exceptions inside of async-routes

#### Frontend libs:
- react, react-dom version of 17 because of issue for lib 'react-modal'
- concurrently -- run client and server at the same time
- react-router-dom -- page navigation
- react-toastify -- nice alerts
- axios -- for async http-queries
- react-icons -- in project use icons of FontAwesome
- react-modal -- work with modal windows

### Deploying
#### set Environment Variables:
1. MongoDB database URI (MONGO_URI)
2. JWT secret (JWT_SECRET)
