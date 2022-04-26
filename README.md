<h1>Support Desk Application</h1>
<p>Client-Server app for tracking tickets, using stack of technologies MERN: MongoDB + ExpressJS + React + NodeJS</p>
<p>State-management: Redux/toolkit</p>
<p>Design: mobile-first</p>
<p>MongoDB models:
  <ol>
    <li>users <br>
        fields: name, email, password, isAdmin</li>
    <li>products<br>
        fields: name</li>
    <li>tickets <br>
        fields: user, product, description, status
    </li>
    <li>notes <br>
        fields: user, ticket, text, isStaff
    </li>
  </ol>
</p>

<h3>Client Functionality:</h3>
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

<h3>Developing details:</h3>
<h4>Backend libs</h4>
<ul>
  <li>express - Express-framework for creating web-apps using NodeJS</li>
  <li>dotenv - for environment variables</li>
  <li>colors - use colors for console-log</li>
  <li>jsonwebtoken - generate web-token for autontification in client-side</li>
  <li>nodemon (dependency) - constanly watch server.js, so we don't need to restart server</li>
  <li>express-async-handler (dependency) - for use async-await - handling exceptions inside of async-routes</li>
</ul>
<h4>Frontend libs</h4>
<ul>
  <li>react, react-dom version of 17 because of issue for lib 'react-modal'
  <li>concurrently - run client and server at the same time</li>
  <li>react-router-dom - page navigation</li>
  <li>react-toastify - nice alerts</li>
  <li>axios - for async http-queries</li>
  <li>react-icons - inproject use icons of FontAwesome</li>
  <li>react-modal - work with modal windows</li>
</ul>

<h3>Deploying:</h3>
<h4>set Environment Variables</h4>
<ol>
  <li>MongoDB database URI (MONGO_URI)</li>
  <li>JWT secret (JWT_SECRET)</li>
</ol>
