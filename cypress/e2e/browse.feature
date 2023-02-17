Feature: Browsing
    Scenario: I want to be able to click the button on the landing page
        Given I am on the landing page
        Given the api request url "/api/hello" and the verb "GET" returns the fixture "hello-success.json"
        When I click the button
        Then I should get an alert with the name "Will"
        Then the api request url "/api/hello" and the verb "GET" should have been made