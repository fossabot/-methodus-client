export class MethodResultStatus<T= any> {
    public result: T;
    public page?: number;
    public total?: number;
    public statusCode: number;
    constructor(result: T, statusCode: number, total?: number, page?: number) {
        this.statusCode = statusCode;

        this.result = result;
        if (total) {
            this.total = total;
        }
        if (page) {
            this.page = page;
        }

    }

}
