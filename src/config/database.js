import pg from 'pg';

const { Pool } = pg;

const config = {
    username: 'luanv',
    password: '153759',
    database: 'league_scheduler',
    host: 'localhost',
    port: 5432
};

const connection = new Pool(config);

export { connection };
