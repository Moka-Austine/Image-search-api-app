const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'src' folder (for JS and CSS)
app.use(express.static(path.join(__dirname, 'src')));

// Serve static files from the 'images' folder (for images)
app.use(express.static(path.join(__dirname, 'images')));

// Serve index.html when the root route is requested
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
