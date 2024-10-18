// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Determine the __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Use the PORT environment variable, or default to port 5000
const PORT = process.env.PORT || 5017;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
