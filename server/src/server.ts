import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
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



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
