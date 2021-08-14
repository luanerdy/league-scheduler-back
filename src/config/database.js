import pg from 'pg';
import 'dotenv.js';

const { Pool } = pg;

const inProduction = !(process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development');

const config = inProduction ? {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
} : {
    username: 'luanv',
    password: '153759',
    database: 'league_scheduler',
    host: 'localhost',
    port: 5432
};

const connection = new Pool(config);

export { connection };
