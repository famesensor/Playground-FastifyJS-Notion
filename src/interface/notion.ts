export interface notions {
    id: string;
    create_date: string;
    type: object;
    status: object;
    priorty: object;
    desc: object;
}

export interface notion {
    title: string;
    type_desc: string;
    status: string;
    priorty: string;
    date: {
        start: string;
        end?: string;
    };
}
