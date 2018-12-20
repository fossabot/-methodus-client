Feature: test client request
    Scenario: get request

        Given the client
        When send action
        Then result is true

    Scenario: test response

        Given create MethodResult
        When create MethodError
        When create MethodEvent
        Then create MethodMessage

    Scenario: test Rest

        Given create interceptor       
        Then message is intercepted