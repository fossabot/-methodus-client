const excludedProps = ["constructor"];
import { MethodDescriptor, MethodType, ParamsMap, Prototyped, Verbs } from "../commons/";
import { MethodError, MethodEvent, MethodResult } from "../response";
import { Rest } from "../transports/rest";

const methodMetadataKey = "methodus";
const metadataKey = "params";
/** the @Method decorator registers the model with the odm
 *  @param {Verbs} verb - the HTTP verb for the route.
 *  @param {string} route - express route string.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this function}
 */
const METHODLOG = "methodus::Method";

export function Method(verb: Verbs, route: string) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {


        target.methodus = target.methodus || {};
        let name = target.name || target.constructor.name;
        target.methodus[name] = target.methodus[name] || { _events: {}, _descriptors: {} };

        let mTarget = target.methodus[name];

        let metaObject: MethodDescriptor = Object.assign({}, { verb, route, propertyKey, params: [] });
        if (mTarget._descriptors[propertyKey]) {
            metaObject = Object.assign(metaObject, { params: mTarget._descriptors[propertyKey].params });
        }

        mTarget._descriptors[propertyKey] = metaObject; // as MethodDescriptor;
        let paramsMap: ParamsMap[];
        if (metaObject.params) {
            paramsMap = metaObject.params;
            paramsMap.sort((a: any, b: any) => {
                return a.index - b.index;
            });
        }

        const originalMethod = descriptor.value;
        descriptor.value = async (...args: any[]) => {

            let config = { methodType: MethodType.Http };
            if ((window as any).METHODUS_CONFIG) {
                config = (window as any).METHODUS_CONFIG;
            }


            if (args && args[args.length - 1] && args[args.length - 1].instruct) {
                target = args[args.length - 1].target;

                target.methodus = target.methodus || {};
                name = target.name || target.constructor.name;
                target.methodus[name] = target.methodus[name] || { _events: {}, _descriptors: {} };

                mTarget = target.methodus[name];

                metaObject = mTarget._descriptors[propertyKey];
                paramsMap = metaObject.params as any;
                paramsMap.sort((a: any, b: any) => {
                    return a.index - b.index;
                });
            }


            const methodus: any = mTarget;
            // merge the configuration object
            Object.assign(methodus, methodus._descriptors[propertyKey]);

            // acquire the method information from the config classes map
            const completeConfiguration: any = Object.assign({}, methodus, config);

            switch (config.methodType) {
                case MethodType.Mock:
                    return await originalMethod.apply(target, args);

                case MethodType.Http:
                    let finalRoute = completeConfiguration.route;
                    if (target.base !== undefined) {
                        finalRoute = target.base + finalRoute;
                    } else if ((window as any).RELATIVE_CONTRACTS) {
                        finalRoute = '.' + finalRoute;
                    }

                    const request = new Rest(finalRoute, completeConfiguration.verb, paramsMap, args);
                    const result = await request.send();
                    return result;
            }
        };
        return descriptor;
    };
}
