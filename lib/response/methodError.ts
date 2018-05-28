
export class MethodError extends Error {
    public error: string;
    public statusCode: number;
    public additional: any;
    constructor(error: string, statusCode?: number, additional?: any) {
        let message = error;
        if (typeof error === "object") {
            message = (error as Error).message;
        }

        super(message);
        this.error = error;

        this.statusCode = statusCode || 500;
        if (additional) {
            this.additional = additional;
        }
    }
}
