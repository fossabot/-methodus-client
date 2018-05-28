/** the MethodConfig decorator registers the controller as a router
 *  @param {string} name - the identifier of the controller in the resolver.
 *  @param {Function[]} middlewares - an array of middlewares to apply to this controller}
 */
export function MethodConfig(name: string) {
    return (target: any) => {
        let proto = target.prototype || target.__proto__;
        // means its a static class , no prototype
        if (target.methodus) {
            proto = target;
        }
        proto.methodus.name = name;

    };
}
