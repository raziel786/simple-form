import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

/**
 * cors is needed to say it is
 * okay for other sites (like the client/frontend) 
 * to talk to this server.
 */
app.use(cors());

app.use(bodyParser.json());

const logPath = path.join(__dirname, '../claims.log');

app.post('/claims', (req, res) => {
  const timestamp = new Date().toISOString();

  // Step 1: Read existing claims first
  fs.readFile(logPath, 'utf8', (readErr, data) => {
    let lines = [];
    let existingClaims = [];

    if (!readErr && data.trim()) {
      lines = data.trim().split('\n');

      existingClaims = lines.map(line => {
        const match = line.match(/^\[(.*?)\] (.+)$/);
        if (!match) return null;
        const [_, timestamp, json] = match;
        try {
          const claim = JSON.parse(json);
          return { timestamp, ...claim };
        } catch (e) {
          console.warn('Skipping malformed line:', line);
          return null;
        }
      }).filter(Boolean);
    }

    // Step 2: Determine next ID
    const nextId =
      existingClaims.length > 0
        ? Math.max(...existingClaims.map(claim => claim.id || 0)) + 1
        : 1;

    // Step 3: Create new claim with id and timestamp
    const newClaim = {
      ...req.body,
      id: nextId,
      timestamp,
    };

    // Step 4: Write new claim to log
    const logLine = `[${timestamp}] ${JSON.stringify(newClaim)}\n`;

    fs.appendFile(logPath, logLine, appendErr => {
      if (appendErr) {
        console.error('Error writing to file:', appendErr);
        return res.status(500).send({ message: 'Failed to write claim.' });
      }

      const updatedClaims = [...existingClaims, newClaim];

      res.status(200).send({
        message: 'Claim logged successfully.',
        claims: updatedClaims,
      });
    });
  });
});

app.get('/claims', (req, res) => {
  const logPath = path.join(__dirname, '../claims.log');

  fs.readFile(logPath, 'utf8', (err, data) => {
    if (err) {
      // If file doesn't exist, return an empty array instead of erroring
      if (err.code === 'ENOENT') {
        return res.status(200).send([]);
      }

      console.error('Error reading file:', err);
      return res.status(500).send({ message: 'Failed to read claims.' });
    }

    const lines = data.trim().split('\n');

    const parsedClaims = lines.map(line => {
      // This finds the timestamp inside square brackets at the start, and the rest of the line after the space
      const match = line.match(/^\[(.*?)\] (.+)$/);
      if (!match) return null;

      /**
       * this returns back:
       * full match / _
       * and then the captured items from the match which are
       * time stamp, and the remaining json which is the claim
       */
      const [_, timestamp, json] = match;
      try {
        const claim = JSON.parse(json);
        return { timestamp, ...claim };
      } catch (e) {
        console.warn('Skipping malformed line:', line);
        return null;
      }
    }).filter(Boolean);

    res.status(200).send(parsedClaims);
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
