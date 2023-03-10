Feature: Browsing
    Scenario: I want to be able to click the button on the landing page with explicit mocking
        Given I am on the landing page
        And the api request url "/api/hello" and the verb "GET" returns the fixture "hello-success.json" with a status code of 200
        When I click the button
        Then I should get an alert with the name "Will"
        And the api request url "/api/hello" and the verb "GET" should have been made

    Scenario: I want to be able to click the button on the landing page with implicit mocking
        Given I am on the landing page
        When I click the button to say hello
        Then I should get an alert with the name "Will" with validation