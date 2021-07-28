import { customExpress } from "./config/customExpress.js";
import { connection } from './config/database.js';
import bcrypt from 'bcrypt';

const app = customExpress();

app.post('/auth/signup', async (req, res) => {
    const { name, nickname, email, avatar, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const sql = `
                INSERT INTO users
                (name, nickname, email, avatar, hashed_password)
                VALUES ($1, $2, $3, $4, $5)`;

    try {
        await connection.query(sql, [name, nickname, email, avatar, hash]);
        res.sendStatus(201);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }  
});

export { app };
