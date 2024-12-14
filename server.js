const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors());

// Serve static files (frontend)
app.use(express.static('public'));

let startTime = null;
let elapsedTime = 0;

// Route to start the stopwatch
app.post('/start', (req, res) => {
  if (!startTime) {
    startTime = Date.now();
  }
  res.json({ message: 'Stopwatch started', elapsedTime });
});

// Route to stop the stopwatch
app.post('/stop', (req, res) => {
  if (startTime) {
    elapsedTime += Date.now() - startTime;
    startTime = null;
  }
  res.json({ message: 'Stopwatch stopped', elapsedTime });
});

// Route to reset the stopwatch
app.post('/reset', (req, res) => {
  elapsedTime = 0;
  startTime = null;
  res.json({ message: 'Stopwatch reset', elapsedTime });
});

// Route to get the current status of the stopwatch
app.get('/status', (req, res) => {
  const currentTime = startTime ? elapsedTime + (Date.now() - startTime) : elapsedTime;
  res.json({ elapsedTime: currentTime });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
