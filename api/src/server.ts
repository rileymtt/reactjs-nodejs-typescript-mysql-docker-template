import mysql from "mysql";
import express, { Request, Response } from "express";

const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));

const PORT = process.env.NODE_DOCKER_PORT || 3001;

const connector = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT) || 3306,
  connectionLimit: 10,
});

export async function executeQuery({
  query,
  values,
}: {
  query: string;
  values: any;
}) {
  try {
    return new Promise((resolve, reject) => {
      connector.query(query, values, (error, elements) => {
        if (error) {
          return reject(error);
        }
        return resolve(elements);
      });
    });
  } catch (error) {
    console.log(error);
    return { error };
  }
}

function GetUserName() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get("/api", async (req: Request, res: Response) => {
  const result = await executeQuery({
    query: "SELECT * FROM users",
    values: [],
  });
  res.send(result);
});

app.post("/api", async (req: Request, res: Response) => {
  const randomUser = GetUserName();
  const result = await executeQuery({
    query: "INSERT INTO users(username, email, age) VALUES(?, ?, ?)",
    values: [
      randomUser,
      `${randomUser}@gmail.com`,
      randomIntFromInterval(16, 40),
    ],
  });
  res.send(result);
});

app.delete("/api", async (req: Request, res: Response) => {
  const { id } = req.query;
  const result = await executeQuery({
    query: `DELETE FROM users WHERE id = ?`,
    values: [id],
  });
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
