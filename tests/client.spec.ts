

import { Jesta, When, Given, Then, Types } from 'jesta';
import 'jest';
import './request.mock';

jest.mock('./request.mock');
import { Contract } from './contract';
import { Method, MethodResult, MethodError, MethodMessage, MethodEvent, Rest, Verbs } from '../lib';

const RESPONSE = 'test response';

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

    @Given([RESPONSE], 'create MethodResult')
    async createMethodResult() {
        const result = new MethodResult({}, 100, 1);
        result.pipe({});
    }

    @When([RESPONSE], 'create MethodError')
    async createMethodError() {
        const error = new MethodError('an error message', 500, ['stack row', 'stack row']);
        return error;
    }


    @When([RESPONSE], 'create MethodEvent')
    async createMethodEvent() {
        const error = new MethodEvent('event-name', { value: 1 }, 'exchange-bus');
        return error;
    }

    @Then([RESPONSE], 'create MethodMessage')
    async createMethodMessage() {
        new MethodMessage('to', 'a message', {}, [], '11111');

    }



    @Given(['test Rest'], 'create interceptor')
    async createInterceptor() {
        Rest.intercept((message: any) => {

        })
    }

    @Then(['test Rest'], 'message is intercepted')
    async messageIsIntercepted() {
        const request = new Rest('/', Verbs.Get, [], []);
        const result = request.prepare('/:id', Verbs.Get, [{ id: 'id', value: '1111' }], { body: 'value' }, {}, {});

    }

}
