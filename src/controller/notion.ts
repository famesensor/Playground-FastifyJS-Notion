import { FastifyRequest, FastifyReply } from 'fastify';

import { HandlerError } from '../utils/errors/errors';
import * as client from '../third-party/client-notion';
import { notion, notions } from '../interface/notion';

const getAllApplications = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const data = await client.notion.databases.query({
            database_id: process.env.NOTION_DATABASE!
        });

        const mapNotion: notions[] = data.results.map((item) => {
            return {
                id: item.id,
                create_date: item.created_time,
                type: item.properties.Type,
                status: item.properties.Stats,
                priorty: item.properties.Priorty,
                desc: item.properties.Name
            };
        });

        reply.status(200).send({ message: 'success', data: mapNotion });
    } catch (error) {
        console.log(error);
        HandlerError(error);
    }
};

const getApplication = async (
    req: FastifyRequest<{ Params: { page_id: string } }>,
    reply: FastifyReply
) => {
    const { page_id } = req.params;

    try {
        const data = await client.notion.pages.retrieve({
            page_id: page_id
        });

        reply.status(200).send({
            message: 'success',
            data: {
                object: data.object,
                id: data.id,
                archived: data.archived,
                properties: data.properties,
                create_date: data.created_time
            }
        });
    } catch (error) {
        console.log(error);
        HandlerError(error);
    }
};

const createPage = async (
    req: FastifyRequest<{ Body: notion }>,
    reply: FastifyReply
) => {
    try {
        const { title, type_desc, status, priorty, date } = req.body;
        const page = await client.notion.pages.create({
            parent: {
                database_id: process.env.NOTION_DATABASE!
            },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: title
                            }
                        }
                    ]
                },
                Status: {
                    select: {
                        name: status
                    }
                },
                Type: {
                    select: {
                        name: type_desc
                    }
                },
                priorty: {
                    select: {
                        name: priorty
                    }
                },
                Date: {
                    date: {
                        start: date.start,
                        end: date.end
                    }
                }
            }
        });

        reply.status(201).send({ message: 'success' });
    } catch (error) {
        console.log(error);
        HandlerError(error);
    }
};

const getDatabases = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const databases = await client.notion.databases.list();
        console.log(databases);

        reply.status(200).send({ message: 'success' });
    } catch (error) {
        console.log(error);
        HandlerError(error);
    }
};

export { getDatabases, getAllApplications, getApplication, createPage };
