import fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const server = fastify({ logger: true });

const port = process.env.PORT || 3000;

server.listen(port, (err, address) => {
    if (err) {
        console.error(`server run error ${err}`);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
