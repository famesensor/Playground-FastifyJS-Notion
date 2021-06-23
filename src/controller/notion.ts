import { FastifyRequest, FastifyReply } from 'fastify';

import { notion } from '../third-party/client-notion';

const getAllApplications = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const data = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE!
        });

        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

const getDatabases = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const databases = await notion.databases.list();

        console.log(databases);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export { getDatabases, getAllApplications };
