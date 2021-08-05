const newGroup = (app, connection) => {
	app.post('/groups/new', async (req, res) => {
		const { name, image, description } = req.body;
		const token = req.get('authorization')?.replace('Bearer ', '');
		const validations = !name || !image || !description || !token;
		if (validations) return res.sendStatus(400);

		const insertGroupSQL = `
        INSERT INTO groups (name, image, description)
        VALUES ($1, $2, $3)`;
		const sessionExistsSQL = `
        SELECT * FROM sessions
        WHERE token = $1`;
		const groupExistsSQL = `
        SELECT * FROM groups
        WHERE name = $1`;
		const insertOwnerSQL = `
        INSERT INTO group_owners (user_id, group_id)
        VALUES ($1, $2)`;
		const insertMemberSQL = `
        INSERT INTO group_members (user_id, group_id, is_adm)
        VALUES ($1, $2, $3)`;

		try {
			const sessionExists = await connection.query(sessionExistsSQL, [
				token,
			]);
			if (!sessionExists.rows[0]) return res.sendStatus(400);
            const userId = sessionExists.rows[0].user_id;

			const groupExists = await connection.query(groupExistsSQL, [name]);
			if (groupExists.rows[0]) return res.sendStatus(409);

            await connection.query(insertGroupSQL, [name, image, description]);
            const groupAdded = await connection.query(groupExistsSQL, [name]);
            const groupId = groupAdded.rows[0].id;
        
            await connection.query(insertOwnerSQL, [userId, groupId]);
            await connection.query(insertMemberSQL, [userId, groupId, true]);

            res.sendStatus(201);
		} catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
	});
};

export { newGroup };
