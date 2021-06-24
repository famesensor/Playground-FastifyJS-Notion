import { FastifyRequest, FastifyReply } from 'fastify';

import { HandlerError } from '../utils/errors/errors';
import { notion } from '../third-party/client-notion';

const getAllApplications = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const data = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE!
        });

        const notions = data.results.map((item) => {
            console.log(item);
            return {
                id: item.id,
                create_date: item.created_time,
                type: item.properties.Type,
                status: item.properties.Stats,
                priorty: item.properties.Priorty,
                desc: item.properties.Name
            };
        });

        return notions;
    } catch (error) {
        console.log(error);
        HandlerError(error);
    }
};

const getApplication = async (req: FastifyRequest, reply: FastifyReply) => {
    console.log(req.params.page_id!);
    return null;
};

const getDatabases = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const databases = await notion.databases.list();
        console.log(databases);

        return null;
    } catch (error) {
        console.log(error);
        HandlerError(error);
    }
};

export { getDatabases, getAllApplications, getApplication };
