import { MethodDescriptor, MethodType, MethodusClass, ParamsMap, Prototyped, Verbs } from "../commons";

export class Rest {
    public static interceptor?: Function;
    public options: any = {};
    public request: any;
    public uri: string;
    constructor(uri: string, verb: Verbs, paramsMap: ParamsMap[], args: any[]) {
        this.uri = uri;
        this.options = this.parse(verb, paramsMap, args);
        if (Rest.interceptor) {
            this.options = Rest.interceptor(this.options);
        }
        this.request = new Request(this.uri);
    }
    public static intercept(interceptor: Function) {
        this.interceptor = interceptor;
    }

    public prepare(url: string, method: Verbs, params: any[], body: any, query: any, headers: any) {
        if (params && url) {
            params.forEach((param: any) => {
                if (url) {
                    url = url.replace(":" + param.id, param.value);
                }
            });
        }

        if (query && query.length > 0) {
            url = url + "?" + query.join("&");
        }

        const formData = new FormData();
        Object.keys(body).forEach((key) => {
            formData.append(key, body[key]);
        });

        if ((window as any).RELATIVE_CONTRACTS) {
            url = '.' + url;
        }

        this.uri = url;
        this.request = new Request(url);

        const options = {
            cache: "default",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            method,
            mode: "cors",
        };

        if (body && Object.keys(body).length > 0) {
            Object.assign(options, { body: JSON.stringify(body) });
        }

        return options;
    }

    public parse(verb: Verbs, paramsMap: ParamsMap[], args: any[]) {
        const queryString: any = [];
        let body: any = {};
        let formData: FormData;
        const headers: any = {};
        const options = {
            cache: "default",
            credentials: "include",
            headers: Object.assign(headers, {
                "Content-Type": "application/json",
            }),
            method: verb,
            mode: "cors",
            redirect: "follow",

        };


        paramsMap.forEach((param: ParamsMap) => {
            if (param.index !== undefined) {
                switch (param.from) {
                    case "params":
                        if (this.uri) {
                            this.uri = this.uri.replace(":" + param.name, args[param.index]);
                        }
                        break;
                    case "query":
                        if (param.name) {
                            queryString.push({ name: param.name, value: args[param.index] });
                        } else {

                            const queryObject = args[param.index];
                            Object.keys(queryObject).forEach((key: string) => {
                                if (Array.isArray(queryObject[key])) {
                                    queryObject[key].forEach((item: string) => {
                                        queryString.push({ name: key, value: item });
                                    });
                                } else {
                                    queryString.push({ name: key, value: queryObject[key] });
                                }

                            });
                        }
                        break;

                    case "body":
                        if (param.name) {
                            body[param.name] = args[param.index];
                        } else {
                            Object.assign(body, args[param.index]);
                        }

                        break;
                    case "files":
                        // create a new multipart-form for every file
                        const formData: FormData = new FormData();
                        let argus = args[param.index];
                        if (!Array.isArray(args[param.index])) {
                            argus = [args[param.index]];
                        }

                        argus.forEach((file: File) => {
                            formData.append(param.name || 'files', file, file.name);
                        });

                        Object.assign(options, { body: formData });
                        delete options.headers['Content-Type'];
                        break;
                    case "headers":
                        if (param.name) {
                            headers[param.name] = args[param.index];
                        } else {
                            Object.assign(headers, args[param.index]);
                        }
                        break;
                }
            }
        });
        if (queryString.length > 0) {
            this.uri = this.uri + "?" + queryString.map((item: any) => {
                if (typeof item.value === "object") {
                    return `${item.name}=${encodeURIComponent(JSON.stringify(item.value))}`;

                } else {
                    return `${item.name}=${encodeURIComponent(item.value)}`;

                }
            }).join("&");
        }

        if (body && Object.keys(body).length > 0) {
            Object.assign(options, { body: JSON.stringify(body) });
        }
        return options;
    }
    public async send() {
        const response = await fetch(this.request, this.options);
        return response.json();
    }

    public async execute() {
        const response = await fetch(this.request, this.options);
        return response.json();
    }
}
