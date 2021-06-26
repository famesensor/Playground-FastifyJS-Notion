import { FastifyInstance } from 'fastify';

import * as notion from '../controller/notion';
import { createPage } from '../utils/validators/notion';

const notionRoute = async (app: FastifyInstance) => {
    app.route({
        method: 'POST',
        url: '/task/',
        schema: createPage,
        handler: notion.createPage
    });

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
