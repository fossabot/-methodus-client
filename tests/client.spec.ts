

import { Jesta, When, Given, Then, Types } from 'jesta';
import 'jest';
import './request.mock';

jest.mock('./request.mock');



import { Contract } from './contract';

const theTests = ['get request'];
@Jesta(Types.Jest, './tests/client.feature')
class ClientTest {
    result: any;
    @Given(theTests, 'the client')
    async start() {
        console.log(Contract.action1);
    }

    @When(theTests, 'send action')
    async action() {

        (window as any).fetch.mockResponseOnce(JSON.stringify({ "status": "ok" }));
        this.result = await Contract.action1(1, 'test');
        console.log(this.result);
        (window as any).fetch.mockResponseOnce(JSON.stringify({ "status": "ok" }));
        this.result = await Contract.action2(1, 'test', 3);
        console.log(this.result);
    }

    @Then(theTests, 'result is true')
    async  assertion() {
        console.log(this.result);
        return this.result != null;
    }

}
