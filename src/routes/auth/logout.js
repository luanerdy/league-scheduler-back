const logout = (app, connection) => {
	app.post('/auth/logout', async (req, res) => {
		const token = req.get('authorization')?.replace('Bearer ', '');
        const sessionSQL = `
                    SELECT * FROM sessions
                    WHERE token = $1`;
		const logoutSQL = `
                    DELETE * FROM sessions
                    WHERE user_id = $1`;

		try {
            const session = connection.query(sessionSQL, [token]);
            if(session.rows[0]) {
                await connection.query(logoutSQL, [session.rows[0].user_id]);
            }
            res.sendStatus(200);
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	});
};

export { logout };
