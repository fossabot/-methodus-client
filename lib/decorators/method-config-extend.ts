import { debug } from "util";

/** the MethodConfig decorator registers the controller as a router
 *  @param {string} name - the identifier of the controller in the resolver.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
 */
export function MethodConfigExtend(extendTarget: any, name?: string) {
    return (target: any) => {
        const filterKeys = ['length', 'caller', 'prototype', 'name', 'methodus', 'methodus_base', 'arguments'];
        const trueName = name || target.name;      
        target.methodus[trueName] = JSON.parse(JSON.stringify(extendTarget.methodus_base));
        let inheritSettings: any = {};
        Object.getOwnPropertyNames(extendTarget.prototype.constructor).forEach((key) => {
            if (filterKeys.indexOf(key) === -1) {
                const func = async (...args: any[]) => {
                    args.push({ target: target.methodus[trueName], instruct: true });
                    return await extendTarget.prototype.constructor[key].apply(target, args);
                };

              
                inheritSettings[key] = func.bind(target);
            }
        });

        Object.assign(target.prototype.constructor, inheritSettings);


        // const mTarget = target.methodus[trueName];
        // const routePrefix = trueName.toLocaleLowerCase();
        // Object.keys(mTarget._descriptors).forEach((desciptorKey) => {
        //     const route = mTarget._descriptors[desciptorKey].route;
        //     mTarget._descriptors[desciptorKey].route = '/' + routePrefix + route;
        // });
    };
}
