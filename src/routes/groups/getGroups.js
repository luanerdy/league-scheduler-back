const getGroups = (app, connection) => {
	app.get('/groups', async (req, res) => {
		const token = req.get('authorization')?.replace('Bearer ', '');
		const sql = `SELECT * FROM groups`;

		if (!token) return res.sendStatus(400);

		try {
            const groups = await connection.query(sql);
            res.send(groups.rows);
		} catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
	});
};

export { getGroups };
