import * as M from "../index";
import { Query } from "../index";

@M.MethodConfig("TestContract")
export class Contract {
    public static base: string;

    @M.Method(M.Verbs.Get, "/posts/:id/:name")
    public static async action1( @M.Param("id") id: number, @M.Param("name") name: string) {
        return;
    }

    @M.Method(M.Verbs.Get, "/action2/:id/:name")
    public static async action2(
        @M.Param("id") id: number,
        @M.Param("name") name: string,
        @M.Query("size") size: number) {
        return;
    }

    @M.Method(M.Verbs.Post, "/api/action3/xaction/:action")
    public static async action3(
        @M.Param("action") action: string,
        @M.Query("size") size: number,
        @M.Body("length") length: number) {
        return;
    }

    @M.Method(M.Verbs.Post, "/api/action4/xaction/:action")
    public static async action4(
        @M.Param("action") action: string,
        @M.Headers("Referer") size: number,
        @M.Body("length") length: number) {
        return;
    }

    @M.Method(M.Verbs.Post, "/api/action5/xaction/:action")
    public static async action5(
        @M.Param("action") action: string,
        @M.Cookies("Size") size: number,
        @M.Body("length") length: number) {
        return;
    }

    @M.Method(M.Verbs.Post, "/api/action6/xaction/:action")
    public static async action6(
        @M.Param("action") action: string,
        @M.Files("file") file: any,
        @M.Body("length") length: number) {
        return;
    }
}
