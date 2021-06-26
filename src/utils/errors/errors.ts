import { CustomError } from '../../interface/error';
class ErrorReponse extends Error {
    constructor(message: string, public status: number, public error?: any) {
        super(message);
    }
}

export const HandlerError = ({ message, status, error }: CustomError) => {
    throw new ErrorReponse(message, status, error);
};
