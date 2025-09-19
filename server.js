
const express = require('express');  // Import Express for routing
const basicAuth = require('basic-auth');  // Import for handling Basic Auth
const dotenv = require('dotenv');  // Import for loading .env variables

dotenv.config();  // This loads variables from .env into process.env

const app = express();  // Create an Express application instance
const port = process.env.PORT || 3000;  // Use PORT from .env or default to 3000

// Retrieve sensitive values from environment variables
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const secretMessage = process.env.SECRET_MESSAGE;

// Middleware function for Basic Authentication
const auth = (req, res, next) => {
  const user = basicAuth(req);  // Parse the Authorization header
  // Check if credentials match; if yes, proceed (next()); else, send 401 error
  if (user && user.name === username && user.pass === password) {
    return next();
  }
  // Set header to prompt browser for credentials
  res.set('WWW-Authenticate', 'Basic realm="Protected"');
  return res.status(401).send('Authentication required.');
};

// Define the root route (/)
app.get('/', (req, res) => {
  res.send('Hello, world!');  // Send a simple response
});

// Define the protected /secret route, using the auth middleware
app.get('/secret', auth, (req, res) => {
  res.send(secretMessage);  // Send the secret if authenticated
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Test deployment
