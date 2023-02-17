import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { Method } from "cypress/types/net-stubbing";

const baseUrl = Cypress.env("baseUrl");

Given("I am on the landing page", () => {
  cy.visit(baseUrl);
});

Given(
  "the api request url {string} and the verb {string} returns the fixture {string} with a status code of {int}",
  (apiUrl: string, verb: Method, fixture: string, statusCode: number) => {
    cy.intercept(verb, apiUrl, (req) => {
      req.reply((res) => {
        res.statusCode = statusCode;
        res.send({ fixture });
      });
    }).as(`${verb}${apiUrl}`);
  }
);

When("I click the button", () => {
  cy.get("button").click();
});

Then(
  "the api request url {string} and the verb {string} should have been made",
  (apiUrl: string, verb: Method) => {
    cy.wait(`@${verb}${apiUrl}`);
  }
);

Then("I should get an alert with the name {string}", (name: string) => {
  cy.get("#alert").should("be.visible");
  cy.get("#alert").invoke("text").should("eq", name);
});
