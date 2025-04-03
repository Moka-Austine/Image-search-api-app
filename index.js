const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'build' folder (for JS, CSS, and images)
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html when the root route is requested
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
