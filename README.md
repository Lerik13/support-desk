# Support Desk Application
Client-Server app for tracking tickets, using stack of technologies MERN: MongoDB + ExpressJS + React + NodeJS<br>

State-management: Redux/toolkit<br>

Design: mobile-first<br>

MongoDB models:<br>
![DB Schema](https://github.com/Lerik13/support-desk/blob/master/schemaDB.jpg?raw=true "DB Schema")

### Client Functionality
<ol>
  <li>Register User</li>
  <li>Login/Logout
      <p>test user: john@gmail.com, password: 123<br>
        Saving JWT-token in user's Local Storage</p>
  </li>
  <li>Create new Ticket for authorized user</li>
  <li>See all user's tickets</li>
  <li>Edit description of user's ticket if the ticket is not-clossed</li>
  <li>Change status for ticket <br>
    ticket created with status='new',<br>
    if status is closed, user cannot edit the ticket, <br>
    user has possibility to reopen the ticket, status will be open</li>
  <li>Add/Edit/Remove Note for user's ticket if the ticket is not-clossed and this note is not from Admin</li>
</ol>

### Developing details
#### Backend libs:
<ul>
  <li>express - Express-framework for creating web-apps using NodeJS</li>
  <li>dotenv - for environment variables</li>
  <li>colors - use colors for console-log</li>
  <li>jsonwebtoken - generate web-token for autontification in client-side</li>
  <li>nodemon (dependency) - constanly watch server.js, so we don't need to restart server</li>
  <li>express-async-handler (dependency) - for use async-await - handling exceptions inside of async-routes</li>
</ul>

#### Frontend libs:
<ul>
  <li>react, react-dom version of 17 because of issue for lib 'react-modal'
  <li>concurrently - run client and server at the same time</li>
  <li>react-router-dom - page navigation</li>
  <li>react-toastify - nice alerts</li>
  <li>axios - for async http-queries</li>
  <li>react-icons - inproject use icons of FontAwesome</li>
  <li>react-modal - work with modal windows</li>
</ul>

### Deploying
#### set Environment Variables:
<ol>
  <li>MongoDB database URI (MONGO_URI)</li>
  <li>JWT secret (JWT_SECRET)</li>
</ol>
