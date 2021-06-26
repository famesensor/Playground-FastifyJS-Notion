export const createPage = {
    body: {
        type: 'object',
        required: ['title', 'type_desc', 'status', 'priorty', 'start'],
        properties: {
            title: {
                type: 'string'
            },
            type_desc: {
                type: 'string',
                enum: ['Self-learning', 'Meeting', 'Project', 'Myself']
            },
            date: {
                start: {
                    type: 'string'
                },
                end: {
                    type: 'string'
                }
            },
            status: {
                type: 'string',
                enum: ['To Do', 'Doing', 'Every day', 'Done']
            },
            priorty: { type: 'string' }
        }
    }
};
