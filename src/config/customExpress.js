import express from 'express';
import cors from 'cors';

const customExpress = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    return app;
};

export { customExpress };
