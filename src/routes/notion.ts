import { FastifyInstance } from 'fastify';

import * as notion from '../controller/notion';

const notionRoute = async (app: FastifyInstance) => {
    app.route({
        method: 'GET',
        url: '/task-list',
        handler: notion.getAllApplications
    });

    app.route({
        method: 'GET',
        url: '/task/:page_id',
        handler: notion.getApplication
    });

    app.route({
        method: 'GET',
        url: '/databases',
        handler: notion.getDatabases
    });
};

export default notionRoute;
