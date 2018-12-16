
import { MethodusClass, ParamsMap } from "../commons";

function pushParams(target: MethodusClass, propertyKey: string, param: ParamsMap) {
    // const methodus = fp.maybeMethodus(target);
    target.methodus = target.methodus || {};
    const name = target.name || target.constructor.name;
    target.methodus[name] = target.methodus[name] || { _events: {}, _descriptors: {} };
    const mTarget = target.methodus[name];


    mTarget._descriptors[propertyKey] = mTarget._descriptors[propertyKey] || { params: [] };
    mTarget._descriptors[propertyKey].params.push(Object.assign({}, param,
        { type: "any" }));
}

function build(from: string, name?: string, type?: any) {
    return (target: any, propertyKey: string, parameterIndex: number) => {
        if (name) {
            pushParams(target, propertyKey, {
                from, index: parameterIndex,
                name,
            });
        } else {
            pushParams(target, propertyKey,
                { from, index: parameterIndex });
        }
    };
}

export function Body(name?: string, type?: any) {
    return build("body", name, type);
}

export function Param(name?: string) {
    return build("params", name);
}

export function Files(name?: string) {
    return build("files", name);
}

export function Headers(name?: string) {
    return build("headers", name);
}

export function Cookies(name?: string) {
    return build("cookies", name);
}

export function Query(name?: string) {
    return build("query", name);
}

export function Request(name?: string) {
    return () => false;
}

export function Response(name?: string) {
    return () => false;
}
