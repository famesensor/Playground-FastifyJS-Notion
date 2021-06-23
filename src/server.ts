import fastify, { FastifyInstance } from 'fastify';
import helmet from 'fastify-helmet';
import cors from 'fastify-cors';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import notion from './routes/notion';

const server: FastifyInstance = fastify({
    logger: {
        level: 'info'
    }
});

// middleware...
server.register(cors);
server.register(helmet);

// route...
server.register(notion, { prefix: '/api/notion' });

// healthz check...
server.get('/ping', async (request, reply) => {
    reply.code(200).send({ message: 'success' });
});

const port = process.env.PORT || 3000;

server.listen(port, (err, address) => {
    if (err) {
        console.error(`server run error ${err}`);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
