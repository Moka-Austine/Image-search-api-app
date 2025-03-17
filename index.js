const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from multiple 'public' folders
app.use(express.static(path.join(__dirname, "./src/access_key.js")));
app.use(express.static(path.join(__dirname, "./src/script.js")));
app.use(express.static(path.join(__dirname, "./src/styles.css")));

// images folder
app.use(express.static(path.join(__dirname, "./images/bridge.jpg")));
app.use(express.static(path.join(__dirname, "./src/house.jpeg")));
app.use(express.static(path.join(__dirname, "./src/chair.jpeg")));


// Serve index.html when the root route is requested
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
