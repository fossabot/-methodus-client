export class Request {
    constructor(url: string) {
        console.log('Request constructor');
    }
}

 
console.log('initializing Request Mock');

(window as any).Request = Request;

