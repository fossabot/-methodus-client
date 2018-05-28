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
        // methodType = methodType || MethodType.Local;
        target.methodus = target.methodus || { _events: {}, _descriptors: {} };

        let metaObject: MethodDescriptor = Object.assign({}, { verb, route, propertyKey, params: [] });
        if (target.methodus._descriptors[propertyKey]) {
            metaObject = Object.assign(metaObject, { params: target.methodus._descriptors[propertyKey].params });
        }

        target.methodus._descriptors[propertyKey] = metaObject; // as MethodDescriptor;
        let paramsMap: ParamsMap[];
        if (metaObject.params) {
            paramsMap = metaObject.params;
            paramsMap.sort((a: any, b: any) => {
                return a.index - b.index;
            });
        }

        // save a reference to the original method
        // const originalMethod = descriptor.value;

        descriptor.value = async (...args: any[]) => {

            // let configName = target.name;
            // if (!configName && target.constructor) {
            //     configName = target.constructor.name;
            // }

            const config = { methodType: MethodType.Http };
            // const thisPointer: Prototyped = this as any;

            // const proto: any = (thisPointer).prototype || (thisPointer).__proto__;
            // try to get the method metadata from the Relection API.
            const methodus: any = target.methodus;
            // if (!methodus) {
            //     // if the target dont contain the methodus metadat, try to get it from the Reflection API
            //     methodus = Reflect.getOwnMetadata(methodMetadataKey, target, propertyKey) || {};
            // }

            // merge the configuration object
            Object.assign(methodus, methodus._descriptors[propertyKey]);

            // rest paramters should be parsed differntly
            // const parser = new RestParser(args, paramsMap, functionArgs);
            // let ParserResponse = parser.parse();

            // acquire the method information from the config classes map
            const completeConfiguration: any = Object.assign({}, methodus, config);

            // let methodType: MethodType = MethodType.Local; // we default to local
            // if (completeConfiguration) {   // if methodinformation exists we use the mehtod from it.
            //     methodType = completeConfiguration.methodType || MethodType.Local;
            // }
            let finalRoute = completeConfiguration.route;
            if (target.base !== undefined) {
                finalRoute = target.base + finalRoute;
            }
            const request = new Rest(finalRoute, completeConfiguration.verb, paramsMap, args);
            const result = await request.send();
            return result;
        };
        return descriptor;
    };
}
