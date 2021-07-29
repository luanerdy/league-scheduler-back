import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const signin = (app, connection) => {
	app.post('/auth/signin', async (req, res) => {
		const { email, password } = req.body;
		const userExistsSQL = `
                    SELECT * FROM users
                    WHERE email = $1`;
		const sessionSQL = `
                    INSERT INTO sessions
                    (user_id, token)
                    VALUES ($1, $2)`;

		try {
			const user = await connection.query(userExistsSQL, [email]);
			const token = uuid();
			const hash = user.rows[0].hashed_password;

			if (user.rows.length === 0 || !bcrypt.compareSync(password, hash)) {
				return res.sendStatus(400);
			}

			await connection.query(sessionSQL, [user.rows[0].id, token]);

			res.send({
				user: user.rows[0],
				token,
			});
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	});
};

export { signin };
