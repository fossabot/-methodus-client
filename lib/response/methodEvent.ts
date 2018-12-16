export class MethodEvent {
    public static emit(name: string, value: any, exchangeName?: string | string[]) {
        const eventResult = new MethodEvent(name, value, exchangeName);
        eventResult.result = eventResult;

    }

    public name: string;
    public value: any;
    public result: any;
    public exchanges?: string[];
    constructor(name: string, value: any, exchangeName?: string | string[]) {
        this.value = value;
        this.name = name;
        if (exchangeName) {
            this.exchanges = Array.isArray(exchangeName) ? (exchangeName) : [exchangeName];
        }
    }

}
