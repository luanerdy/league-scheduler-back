import bcrypt from 'bcrypt';

const signup = (app, connection) => {
    app.post('/auth/signup', async (req, res) => {
        const { name, nickname, email, avatar, password } = req.body;
        const hash = bcrypt.hashSync(password, 10);
        const userExistsSQL = `
                    SELECT * FROM users
                    WHERE email = $1`;
        const insertSQL = `
                    INSERT INTO users
                    (name, nickname, email, avatar, hashed_password)
                    VALUES ($1, $2, $3, $4, $5)`;
    
        try {
            const exists = connection.query(userExistsSQL, [email]);
            if(exists.rows.length === 0) return res.sendStatus(400);

            await connection.query(sql, [name, nickname, email, avatar, hash]);
            res.sendStatus(201);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }  
    });
}

export { signup }
