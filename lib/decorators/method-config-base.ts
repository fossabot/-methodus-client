/** the MethodConfig decorator registers the controller as a router
 *  @param {string} name - the identifier of the controller in the resolver.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
 */
export function MethodConfigBase(name: string) {
    return (target: any) => {
        const innerName = target.name || target.constructor.name;       
        //fix methodus
        target.methodus[name] = target.methodus[innerName];      
        let proto = target.prototype || target.__proto__;
        // means its a static class , no prototype
        if (target.methodus) {
            proto = target;
        }
        proto.methodus_base = JSON.parse(JSON.stringify(target.methodus[name]));
    };
}
