import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { Method } from "cypress/types/net-stubbing";

const baseUrl = Cypress.env("baseUrl");

Given("I am on the landing page", () => {
  cy.visit(baseUrl);
});

Given(
  "the api request url {string} and the verb {string} returns the fixture {string}",
  (apiUrl: string, verb: Method, fixture: string) => {
    cy.intercept(verb, apiUrl, { fixture }).as(`${verb}${apiUrl}`);
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
